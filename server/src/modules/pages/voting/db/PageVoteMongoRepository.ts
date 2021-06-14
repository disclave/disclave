import { PageVoteRepository } from "@/modules/pages/voting/db";
import { injectable } from "inversify";
import {
  ClientSession,
  MongoRepository,
  OrderedBulkOperation,
} from "@/connectors/mongodb";
import { pagesDbCollection } from "@/database/pages";
import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

@injectable()
export class PageVoteMongoRepository
  extends MongoRepository
  implements PageVoteRepository<ClientSession> {
  public async setVoteUp(urlId: UrlId, uid: UserId): Promise<boolean> {
    const bulk = await getBulkOp();
    const filter = urlIdToIdFilter(urlId);

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

  public async setVoteDown(urlId: UrlId, uid: UserId): Promise<boolean> {
    const bulk = await getBulkOp();
    const filter = urlIdToIdFilter(urlId);

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

  public async removeVote(urlId: UrlId, uid: UserId): Promise<boolean> {
    const bulk = await getBulkOp();
    const filter = urlIdToIdFilter(urlId);

    bulk.find(filter).updateOne({
      $pull: {
        votesUp: uid,
        votesDown: uid,
      },
    });
    bulk.find(filter).updateOne([updateVotesSumAggregation]);

    return await executeBult(bulk);
  }
}

async function getBulkOp(): Promise<OrderedBulkOperation> {
  const collection = await pagesDbCollection();
  return collection.initializeOrderedBulkOp();
}

async function executeBult(bulk: OrderedBulkOperation): Promise<boolean> {
  const result = await bulk.execute();
  return result.nModified > 0;
}

const updateVotesSumAggregation = {
  $set: {
    votesSum: {
      $subtract: [{ $size: "$votesUp" }, { $size: "$votesDown" }],
    },
  },
};

function urlIdToIdFilter(urlId: UrlId) {
  return {
    _id: {
      pageId: urlId.pageId,
      websiteId: urlId.websiteId,
    },
  };
}
