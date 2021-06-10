import { CommentVoteRepository } from "./index";
import { injectable } from "inversify";
import { ObjectID, MongoRepository } from "@/connectors/mongodb";
import { ClientSession, OrderedBulkOperation } from "mongodb";
import { UserId } from "@/modules/auth";
import { commentsDbCollection } from "@/database/comments";

@injectable()
export class CommentVoteMongoRepository
  extends MongoRepository
  implements CommentVoteRepository<ClientSession> {
  public async removeVote(commentId: string, uid: UserId): Promise<boolean> {
    const bulk = await getBulkOp();
    const filter = idSelector(commentId);

    bulk.find(filter).updateOne({
      $pull: {
        votesUp: uid,
        votesDown: uid,
      },
    });
    bulk.find(filter).updateOne([updateVotesSumAggregation]);

    return await executeBult(bulk);
  }

  public async setVoteDown(commentId: string, uid: UserId): Promise<boolean> {
    const bulk = await getBulkOp();
    const filter = idSelector(commentId);

    bulk.find(filter).updateOne({
      $pull: {
        votesUp: uid,
      },
      $addToSet: {
        votesDown: uid,
      },
    });
    bulk.find(filter).updateOne([updateVotesSumAggregation]);

    return await executeBult(bulk);
  }

  public async setVoteUp(commentId: string, uid: UserId): Promise<boolean> {
    const bulk = await getBulkOp();
    const filter = idSelector(commentId);

    bulk.find(filter).updateOne({
      $pull: {
        votesDown: uid,
      },
      $addToSet: {
        votesUp: uid,
      },
    });
    bulk.find(filter).updateOne([updateVotesSumAggregation]);

    return await executeBult(bulk);
  }
}

async function getBulkOp(): Promise<OrderedBulkOperation> {
  const collection = await commentsDbCollection();
  return collection.initializeOrderedBulkOp();
}

async function executeBult(bulk: OrderedBulkOperation): Promise<boolean> {
  const result = await bulk.execute();
  return result.nModified > 0;
}

function idSelector(commentId: string) {
  return { _id: new ObjectID(commentId) };
}

const updateVotesSumAggregation = {
  $set: {
    votesSum: {
      $subtract: [{ $size: "$votesUp" }, { $size: "$votesDown" }],
    },
  },
};
