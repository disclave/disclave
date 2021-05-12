import { CommentEntity } from "./CommentEntity";
import { AuthorInfo, CommentRepository, UrlMeta } from "./index";
import { injectable } from "inversify";
import { Timestamp, ObjectID, MongoRepository } from "@/connectors/mongodb";
import { ClientSession } from "mongodb";
import { asUserId, UserId } from "@/modules/auth";
import { commentsDbCollection, getProjection } from "@/database/comments";
import { DbComment } from "@/database";

@injectable()
export class CommentMongoRepository
  extends MongoRepository
  implements CommentRepository<ClientSession> {
  public async findComments(
    url: UrlMeta,
    uid: UserId | null
  ): Promise<Array<CommentEntity>> {
    const collection = await commentsDbCollection();
    const cursor = collection
      .find(urlMetaToQuery(url), {
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

  public async countComments(url: UrlMeta): Promise<number> {
    const collection = await commentsDbCollection();
    return await collection.countDocuments(urlMetaToQuery(url));
  }

  public async addComment(
    author: AuthorInfo,
    text: string,
    url: UrlMeta
  ): Promise<CommentEntity> {
    const collection = await commentsDbCollection();
    const result = await collection.insertOne(toDbComment(author, text, url));

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

const idSelector = (commentId: string) => ({
  _id: new ObjectID(commentId),
});

const urlMetaToQuery = (url: UrlMeta) => {
  return {
    "url.websiteId": url.websiteId,
    "url.pageId": url.pageId,
  };
};

const updateVotesSumAggregation = {
  $set: {
    votesSum: {
      $subtract: [{ $size: "$votesUp" }, { $size: "$votesDown" }],
    },
  },
};

const toDbComment = (
  author: AuthorInfo,
  text: string,
  url: UrlMeta
): DbComment => ({
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
    raw: url.raw,
    websiteId: url.websiteId,
    pageId: url.pageId,
  },
});

const cursorDocToEntity = (doc: DbComment): CommentEntity => {
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
};
