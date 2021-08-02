import { injectable } from "inversify";
import { ClientSession, MongoRepository } from "@/connectors/mongodb";
import { commentsDbCollection } from "@/database/comments";
import { getAggregationProjection, pagesDbCollection } from "@/database/pages";
import { commentsCollection, pagesCollection } from "@/database";
import { UserId } from "@/modules/auth";
import {
  TopCommentedPagesAggregation,
  TopRatedPagesAggregation,
} from "./aggregations";
import { TopCommentedParams, TopRatedParams, PageRankingRepository } from ".";
import { RankingPageEntity } from "./entity";

@injectable()
export class PageRankingMongoRepository
  extends MongoRepository
  implements PageRankingRepository<ClientSession> {
  public async findTopCommentedPages(
    params: TopCommentedParams,
    uid: UserId | null
  ): Promise<Array<RankingPageEntity>> {
    const collection = await commentsDbCollection();
    const cursor = collection.aggregate<TopCommentedPagesAggregation>([
      {
        $match: {
          votesSum: { $gte: params.commentsMinVoteSum },
          ...(params.websiteId ? { "url.websiteId": params.websiteId } : {}),
          ...(params.excludePageId
            ? { "url.pageId": { $ne: params.excludePageId } }
            : {}),
        },
      },
      {
        $group: {
          _id: { websiteId: "$url.websiteId", pageId: "$url.pageId" },
          commentsCount: { $sum: 1 },
        },
      },
      { $sort: { commentsCount: -1, "_id.pageId": 1, "_id.websiteId": 1 } },
      { $limit: params.limit },
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
      {
        $sort: {
          commentsCount: -1,
          "page.votesSum": -1,
          "_id.pageId": 1,
          "_id.websiteId": 1,
        },
      },
    ]);

    return await cursor.map(topCommentedAggCursorDocToEntity).toArray();
  }

  public async findTopRatedPages(
    params: TopRatedParams,
    uid: UserId | null
  ): Promise<Array<RankingPageEntity>> {
    const collection = await pagesDbCollection();
    const cursor = collection.aggregate<TopRatedPagesAggregation>([
      {
        $match: {
          votesSum: { $gte: params.pageMinVoteSum },
          ...(params.websiteId ? { "_id.websiteId": params.websiteId } : {}),
          ...(params.excludePageId
            ? { "_id.pageId": { $ne: params.excludePageId } }
            : {}),
        },
      },
      { $sort: { votesSum: -1, timestamp: -1 } },
      { $limit: params.limit },
      { $project: getAggregationProjection(uid) },
      {
        $lookup: {
          from: commentsCollection,
          let: {
            websiteId: "$_id.websiteId",
            pageId: "$_id.pageId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$url.websiteId", "$$websiteId"] },
                    { $eq: ["$url.pageId", "$$pageId"] },
                    { $gte: ["$votesSum", params.commentsMinVoteSum] },
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
      { $sort: { votesSum: -1, "comments.count": -1, timestamp: -1 } },
    ]);

    return await cursor.map(topRatedAggCursorDocToEntity).toArray();
  }
}

function topCommentedAggCursorDocToEntity(
  doc: TopCommentedPagesAggregation
): RankingPageEntity {
  return {
    id: doc._id.websiteId + doc._id.pageId,
    pageId: doc._id.pageId,
    websiteId: doc._id.websiteId,
    commentsCount: doc.commentsCount ?? 0,
    url: doc.page.normalizedUrl,
    meta: doc.page.meta
      ? {
          logo: doc.page.meta.logo,
          title: doc.page.meta.title,
        }
      : null,
    votes: {
      sum: doc.page.votesSum,
      votedUp: !!doc.page.votesUp && doc.page.votesUp.length > 0,
      votedDown: !!doc.page.votesDown && doc.page.votesDown.length > 0,
    },
  };
}

function topRatedAggCursorDocToEntity(
  doc: TopRatedPagesAggregation
): RankingPageEntity {
  return {
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
      votedUp: !!doc.votesUp && doc.votesUp.length > 0,
      votedDown: !!doc.votesDown && doc.votesDown.length > 0,
    },
  };
}
