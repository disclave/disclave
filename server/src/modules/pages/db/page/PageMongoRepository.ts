import {
  PageEntity,
  PageDetailsData,
  PageDetailsEntity,
  PageRepository,
  UrlMeta,
} from "@/modules/pages/db";
import { injectable } from "inversify";
import { MongoRepository, timestampNow } from "@/connectors/mongodb";
import { ClientSession } from "@/connectors/mongodb";
import { commentsDbCollection } from "@/database/comments";
import {
  getAggregationProjection,
  getProjection,
  pagesDbCollection,
} from "@/database/pages";
import { commentsCollection, DbPageDetails, pagesCollection } from "@/database";
import { UserId } from "@/modules/auth";

interface TopCommentedPagesAggregation {
  _id: {
    websiteId: string;
    pageId: string;
  };
  commentsCount?: number;
  page: {
    meta: null | {
      logo: string | null;
      title: string | null;
    };
    votesSum: number;
    votesUp: string[] | null;
    votesDown: string[] | null;
    normalizedUrl: string;
  };
}

interface TopRatedPagesAggregation {
  _id: {
    websiteId: string;
    pageId: string;
  };
  normalizedUrl: string;
  votesSum: number;
  votesUp: string[] | null;
  votesDown: string[] | null;
  meta: null | {
    logo: string | null;
    title: string | null;
  };
  comments: {
    count: number;
  };
}

@injectable()
export class PageMongoRepository
  extends MongoRepository
  implements PageRepository<ClientSession> {
  public async findTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<PageEntity>> {
    const collection = await commentsDbCollection();
    const cursor = collection.aggregate<TopCommentedPagesAggregation>([
      { $match: { votesSum: { $gte: commentsMinVoteSum } } },
      {
        $group: {
          _id: { websiteId: "$url.websiteId", pageId: "$url.pageId" },
          commentsCount: { $sum: 1 },
        },
      },
      { $sort: { commentsCount: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: pagesCollection,
          let: { websiteId: "$_id.websiteId", pageId: "$_id.pageId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$_id.websiteId", "$$websiteId"] },
                    { $eq: ["$_id.pageId", "$$pageId"] },
                  ],
                },
              },
            },
            { $project: getAggregationProjection(uid) },
          ],
          as: "page",
        },
      },
      { $match: { page: { $exists: true, $size: 1 } } },
      { $unwind: "$page" },
      { $sort: { commentsCount: -1, "page.votesSum": -1 } },
    ]);

    return await cursor.map(topCommentedAggCursorDocToEntity).toArray();
  }

  public async findTopRatedPages(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<PageEntity>> {
    const collection = await pagesDbCollection();
    const cursor = collection.aggregate<TopRatedPagesAggregation>([
      { $match: { votesSum: { $gte: minVoteSum } } },
      { $sort: { votesSum: -1 } },
      { $limit: limit },
      { $project: getAggregationProjection(uid) },
      {
        $lookup: {
          from: commentsCollection,
          let: { websiteId: "$_id.websiteId", pageId: "$_id.pageId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$url.websiteId", "$$websiteId"] },
                    { $eq: ["$url.pageId", "$$pageId"] },
                  ],
                },
              },
            },
            { $count: "count" },
          ],
          as: "comments",
        },
      },
      {
        $match: {
          $or: [
            { comments: { $exists: true, $size: 0 } },
            { comments: { $exists: true, $size: 1 } },
          ],
        },
      },
      { $unwind: { path: "$comments", preserveNullAndEmptyArrays: true } },
      { $sort: { votesSum: -1, "comments.count": -1 } },
    ]);

    return await cursor.map(topRatedAggCursorDocToEntity).toArray();
  }

  public async findPageDetails(
    normalizedUrl: string
  ): Promise<PageDetailsEntity | null> {
    const collection = await pagesDbCollection();
    const doc = await collection.findOne(
      {
        matchingUrls: normalizedUrl,
      },
      {
        projection: getProjection(null),
      }
    );
    if (!doc) return null;
    return cursorDocToEntity(doc);
  }

  public async findOrCreatePageDetails(
    url: UrlMeta,
    uid: UserId | null
  ): Promise<PageDetailsEntity> {
    const collection = await pagesDbCollection();
    const result = await collection.findOneAndUpdate(
      urlMetaToIdFilter(url),
      {
        $setOnInsert: toDbPageDetails(url, null),
      },
      {
        upsert: true,
        returnOriginal: false,
        projection: getProjection(uid),
      }
    );
    return cursorDocToEntity(result.value);
  }

  public async updatePageDetails(
    url: UrlMeta,
    data: PageDetailsData,
    uid: UserId | null
  ) {
    const collection = await pagesDbCollection();
    const result = await collection.findOneAndUpdate(
      urlMetaToIdFilter(url),
      {
        $setOnInsert: toPartialDbPageDetails(url),
        $set: {
          meta: metaToDbPageDetailsMeta(data),
        },
      },
      {
        upsert: true,
        returnOriginal: false,
        projection: getProjection(uid),
      }
    );
    return cursorDocToEntity(result.value);
  }

  public async setVoteUp(url: UrlMeta, uid: UserId): Promise<boolean> {
    this.findOrCreatePageDetails(url, null); // save default page data to db, if not exists

    const collection = await pagesDbCollection();
    const bulk = collection.initializeOrderedBulkOp();
    bulk.find(urlMetaToIdFilter(url)).updateOne({
      $pull: {
        votesDown: uid,
      },
      $addToSet: {
        votesUp: uid,
      },
    });
    bulk.find(urlMetaToIdFilter(url)).updateOne([updateVotesSumAggregation]);

    const result = await bulk.execute();
    return result.nModified > 0;
  }

  public async setVoteDown(url: UrlMeta, uid: UserId): Promise<boolean> {
    this.findOrCreatePageDetails(url, null); // save default page data to db, if not exists

    const collection = await pagesDbCollection();
    const bulk = collection.initializeOrderedBulkOp();
    bulk.find(urlMetaToIdFilter(url)).updateOne({
      $pull: {
        votesUp: uid,
      },
      $addToSet: {
        votesDown: uid,
      },
    });
    bulk.find(urlMetaToIdFilter(url)).updateOne([updateVotesSumAggregation]);

    const result = await bulk.execute();
    return result.nModified > 0;
  }

  public async removeVote(url: UrlMeta, uid: UserId): Promise<boolean> {
    this.findOrCreatePageDetails(url, null); // save default page data to db, if not exists

    const collection = await pagesDbCollection();
    const bulk = collection.initializeOrderedBulkOp();
    bulk.find(urlMetaToIdFilter(url)).updateOne({
      $pull: {
        votesUp: uid,
        votesDown: uid,
      },
    });
    bulk.find(urlMetaToIdFilter(url)).updateOne([updateVotesSumAggregation]);

    const result = await bulk.execute();
    return result.nModified > 0;
  }
}

const updateVotesSumAggregation = {
  $set: {
    votesSum: {
      $subtract: [{ $size: "$votesUp" }, { $size: "$votesDown" }],
    },
  },
};

const urlMetaToIdFilter = (url: UrlMeta) => ({
  _id: {
    pageId: url.pageId,
    websiteId: url.websiteId,
  },
});

const toPartialDbPageDetails = (url: UrlMeta) => ({
  _id: {
    pageId: url.pageId,
    websiteId: url.websiteId,
  },
  normalizedUrl: url.normalized,
  matchingUrls: [url.normalized],
  votesUp: [],
  votesDown: [],
  votesSum: 0,
  timestamp: timestampNow(),
});

const toDbPageDetails = (
  url: UrlMeta,
  data: PageDetailsData | null
): DbPageDetails => ({
  ...toPartialDbPageDetails(url),
  meta: metaToDbPageDetailsMeta(data),
});

const metaToDbPageDetailsMeta = (data: PageDetailsData | null) => {
  if (!data) return null;
  return {
    logo: data.logo,
    title: data.title,
  };
};

const topCommentedAggCursorDocToEntity = (
  doc: TopCommentedPagesAggregation
): PageEntity => ({
  id: doc._id.websiteId + doc._id.pageId,
  pageId: doc._id.pageId,
  websiteId: doc._id.websiteId,
  commentsCount: doc.commentsCount,
  url: doc.page.normalizedUrl,
  meta: doc.page.meta
    ? {
        logo: doc.page.meta.logo,
        title: doc.page.meta.title,
      }
    : null,
  votes: {
    sum: doc.page.votesSum,
    votedUp: doc.page.votesUp?.length > 0,
    votedDown: doc.page.votesDown?.length > 0,
  },
});

const topRatedAggCursorDocToEntity = (
  doc: TopRatedPagesAggregation
): PageEntity => ({
  id: doc._id.websiteId + doc._id.pageId,
  pageId: doc._id.pageId,
  websiteId: doc._id.websiteId,
  commentsCount: doc.comments?.count || 0,
  url: doc.normalizedUrl,
  meta: doc.meta
    ? {
        logo: doc.meta.logo,
        title: doc.meta.title,
      }
    : null,
  votes: {
    sum: doc.votesSum,
    votedUp: doc.votesUp?.length > 0,
    votedDown: doc.votesDown?.length > 0,
  },
});

const cursorDocToEntity = (doc: DbPageDetails): PageDetailsEntity => ({
  pageId: doc._id.pageId,
  websiteId: doc._id.websiteId,
  url: doc.normalizedUrl,
  votes: {
    sum: doc.votesSum,
    votedUp: doc.votesUp?.length > 0,
    votedDown: doc.votesDown?.length > 0,
  },
  meta: doc.meta
    ? {
        logo: doc.meta.logo,
        title: doc.meta.title,
      }
    : null,
});
