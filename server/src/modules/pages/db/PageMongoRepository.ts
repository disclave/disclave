import { PageEntity } from "./PageEntity";
import {
  PageDetailsData,
  PageDetailsEntity,
  PageRepository,
  UrlMeta,
} from "./index";
import { injectable } from "inversify";
import { MongoRepository, timestampNow } from "@/connectors/mongodb";
import { ClientSession } from "@/connectors/mongodb";
import { commentsDbCollection } from "@/database/comments";
import { getProjection, pagesDbCollection } from "@/database/pages";
import { DbPageDetails } from "@/database";
import { UserId } from "@/modules/auth";

interface TopCommentedPagesAggregation {
  _id: {
    websiteId: string;
    pageId: string;
  };
  commentsCount: number;
}

@injectable()
export class PageMongoRepository
  extends MongoRepository
  implements PageRepository<ClientSession> {
  public async findTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number
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
    ]);

    return await cursor.map(aggCursorDocToEntity).toArray();
  }

  public async findPageDetails(
    url: UrlMeta,
    uid: UserId | null
  ): Promise<PageDetailsEntity | null> {
    const collection = await pagesDbCollection();
    const doc = await collection.findOne(urlMetaToIdFilter(url), {
      projection: getProjection(uid),
    });
    if (!doc) return null;
    return cursorDocToEntity(doc);
  }

  public async savePageDetails(url: UrlMeta, data: PageDetailsData) {
    const collection = await pagesDbCollection();
    await collection.replaceOne(
      urlMetaToIdFilter(url),
      toDbPageDetails(url, data),
      { upsert: true }
    );
  }

  public async setVoteUp(url: UrlMeta, uid: UserId): Promise<boolean> {
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

const toDbPageDetails = (
  url: UrlMeta,
  data: PageDetailsData | null
): DbPageDetails => ({
  _id: {
    pageId: url.pageId,
    websiteId: url.websiteId,
  },
  votesUp: [],
  votesDown: [],
  votesSum: 0,
  meta: data
    ? {
        logo: data.logo,
        title: data.title,
      }
    : null,
  timestamp: timestampNow(),
});

const aggCursorDocToEntity = (
  doc: TopCommentedPagesAggregation
): PageEntity => {
  return {
    id: doc._id.websiteId + doc._id.pageId,
    pageId: doc._id.pageId,
    websiteId: doc._id.websiteId,
    commentsCount: doc.commentsCount,
  };
};

const cursorDocToEntity = (doc: DbPageDetails): PageDetailsEntity => ({
  pageId: doc._id.pageId,
  websiteId: doc._id.websiteId,
  votes: {
    sum: doc.votesSum,
    votedUp: doc.votesUp?.length > 0,
    votedDown: doc.votesDown?.length > 0,
  },
  meta: {
    logo: doc.meta.logo,
    title: doc.meta.title,
  },
});
