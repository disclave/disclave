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
import { PageRankingRepository } from ".";
import { PageEntity } from "./entity";

@injectable()
export class PageRankingMongoRepository
  extends MongoRepository
  implements PageRankingRepository<ClientSession> {
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
}

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
