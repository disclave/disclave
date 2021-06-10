import { CommentRankingRepository, CommentEntity } from "./index";
import { injectable } from "inversify";
import { MongoRepository, ClientSession } from "@/connectors/mongodb";
import { asUserId, UserId } from "@/modules/auth";
import { commentsDbCollection, getProjection } from "@/database/comments";
import { DbComment } from "@/database";

@injectable()
export class CommentRankingMongoRepository
  extends MongoRepository
  implements CommentRankingRepository<ClientSession> {
  public async findLatestComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<CommentEntity>> {
    const collection = await commentsDbCollection();
    const cursor = collection
      .find(
        {
          votesSum: { $gte: minVoteSum },
        },
        {
          projection: getProjection(uid),
        }
      )
      .sort({ timestamp: -1 })
      .limit(limit);

    return await cursor.map(cursorDocToEntity).toArray();
  }

  public async findTopComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<CommentEntity>> {
    const collection = await commentsDbCollection();
    const cursor = collection
      .find(
        {
          votesSum: { $gte: minVoteSum },
        },
        {
          projection: getProjection(uid),
        }
      )
      .sort({ votesSum: -1, timestamp: -1 })
      .limit(limit);

    return await cursor.map(cursorDocToEntity).toArray();
  }
}

function cursorDocToEntity(doc: DbComment): CommentEntity {
  return {
    id: doc._id.toHexString(),
    text: doc.text,
    author: {
      id: asUserId(doc.author.id),
      name: doc.author.name,
    },
    votes: {
      sum: doc.votesSum,
      votedUp: doc.votesUp?.length > 0,
      votedDown: doc.votesDown?.length > 0,
    },
    timestamp: new Date(doc.timestamp.getHighBits() * 1000).toUTCString(),
    url: {
      raw: doc.url.raw,
      websiteId: doc.url.websiteId,
      pageId: doc.url.pageId,
    },
  };
}
