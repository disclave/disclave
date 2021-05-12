import { PageEntity } from "./PageEntity";
import { PageRepository } from "./index";
import { injectable } from "inversify";
import { MongoRepository } from "@/connectors/mongodb";
import { ClientSession } from "mongodb";
import { commentsDbCollection } from "@/database/comments";

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
}

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
