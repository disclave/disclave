import { CommentEntity } from "./CommentEntity";
import { AuthorInfo, CommentRepository } from "./index";
import { injectable } from "inversify";
import { Timestamp, ObjectID, MongoRepository } from "@/connectors/mongodb";
import { ClientSession } from "mongodb";
import { asUserId, UserId } from "@/modules/auth";
import { commentsDbCollection, getProjection } from "@/database/comments";
import { DbComment } from "@/database";
import { UrlId } from "@/modules/pages";

@injectable()
export class CommentMongoRepository
  extends MongoRepository
  implements CommentRepository<ClientSession> {
  public async findComments(
    urlId: UrlId,
    uid: UserId | null
  ): Promise<Array<CommentEntity>> {
    const collection = await commentsDbCollection();
    const cursor = collection
      .find(urlIdToQuery(urlId), {
        projection: getProjection(uid),
      })
      .sort({ timestamp: -1 });

    return await cursor.map(cursorDocToEntity).toArray();
  }

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
      .sort({ votesSum: -1 })
      .limit(limit);

    return await cursor.map(cursorDocToEntity).toArray();
  }

  public async countComments(urlId: UrlId): Promise<number> {
    const collection = await commentsDbCollection();
    return await collection.countDocuments(urlIdToQuery(urlId));
  }

  public async addComment(
    author: AuthorInfo,
    text: string,
    urlId: UrlId,
    rawUrl: string
  ): Promise<CommentEntity> {
    const comment = toDbComment(author, text, urlId, rawUrl);

    const collection = await commentsDbCollection();
    const result = await collection.insertOne(comment);

    const doc = await collection.findOne(
      {
        _id: result.insertedId,
      },
      {
        projection: getProjection(author.uid),
      }
    );
    return cursorDocToEntity(doc);
  }

  public async removeVote(commentId: string, uid: UserId): Promise<boolean> {
    const collection = await commentsDbCollection();

    const bulk = collection.initializeOrderedBulkOp();
    bulk.find(idSelector(commentId)).updateOne({
      $pull: {
        votesUp: uid,
        votesDown: uid,
      },
    });
    bulk.find(idSelector(commentId)).updateOne([updateVotesSumAggregation]);

    const result = await bulk.execute();
    return result.nModified > 0;
  }

  public async setVoteDown(commentId: string, uid: UserId): Promise<boolean> {
    const collection = await commentsDbCollection();

    const bulk = collection.initializeOrderedBulkOp();
    bulk.find(idSelector(commentId)).updateOne({
      $pull: {
        votesUp: uid,
      },
      $addToSet: {
        votesDown: uid,
      },
    });
    bulk.find(idSelector(commentId)).updateOne([updateVotesSumAggregation]);

    const result = await bulk.execute();
    return result.nModified > 0;
  }

  public async setVoteUp(commentId: string, uid: UserId): Promise<boolean> {
    const collection = await commentsDbCollection();

    const bulk = collection.initializeOrderedBulkOp();
    bulk.find(idSelector(commentId)).updateOne({
      $pull: {
        votesDown: uid,
      },
      $addToSet: {
        votesUp: uid,
      },
    });
    bulk.find(idSelector(commentId)).updateOne([updateVotesSumAggregation]);

    const result = await bulk.execute();
    return result.nModified > 0;
  }
}

function idSelector(commentId: string) {
  return {
    _id: new ObjectID(commentId),
  };
}

function urlIdToQuery(urlId: UrlId) {
  return {
    "url.websiteId": urlId.websiteId,
    "url.pageId": urlId.pageId,
  };
}

const updateVotesSumAggregation = {
  $set: {
    votesSum: {
      $subtract: [{ $size: "$votesUp" }, { $size: "$votesDown" }],
    },
  },
};

function toDbComment(
  author: AuthorInfo,
  text: string,
  urlId: UrlId,
  rawUrl: string
): DbComment {
  return {
    text: text,
    author: {
      id: author.uid,
      name: author.name,
    },
    votesUp: [author.uid],
    votesDown: [],
    votesSum: 1,
    timestamp: new Timestamp(0, Math.floor(new Date().getTime() / 1000)),
    url: {
      raw: rawUrl,
      websiteId: urlId.websiteId,
      pageId: urlId.pageId,
    },
  };
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
