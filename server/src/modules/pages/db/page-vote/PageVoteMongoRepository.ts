import { PageVoteRepository } from "@/modules/pages/db";
import { injectable } from "inversify";
import { MongoRepository } from "@/connectors/mongodb";
import { ClientSession } from "@/connectors/mongodb";
import { pagesDbCollection } from "@/database/pages";
import { UserId } from "@/modules/auth";
import { UrlId } from ".";

@injectable()
export class PageVoteMongoRepository
  extends MongoRepository
  implements PageVoteRepository<ClientSession> {
  // TODO: validate case, when page doc not exists in DB
  public async setVoteUp(urlId: UrlId, uid: UserId): Promise<boolean> {
    const collection = await pagesDbCollection();
    const bulk = collection.initializeOrderedBulkOp();
    bulk.find(pageIdToIdFilter(urlId)).updateOne({
      $pull: {
        votesDown: uid,
      },
      $addToSet: {
        votesUp: uid,
      },
    });
    bulk.find(pageIdToIdFilter(urlId)).updateOne([updateVotesSumAggregation]);

    const result = await bulk.execute();
    return result.nModified > 0;
  }

  public async setVoteDown(urlId: UrlId, uid: UserId): Promise<boolean> {
    const collection = await pagesDbCollection();
    const bulk = collection.initializeOrderedBulkOp();
    bulk.find(pageIdToIdFilter(urlId)).updateOne({
      $pull: {
        votesUp: uid,
      },
      $addToSet: {
        votesDown: uid,
      },
    });
    bulk.find(pageIdToIdFilter(urlId)).updateOne([updateVotesSumAggregation]);

    const result = await bulk.execute();
    return result.nModified > 0;
  }

  public async removeVote(urlId: UrlId, uid: UserId): Promise<boolean> {
    const collection = await pagesDbCollection();
    const bulk = collection.initializeOrderedBulkOp();
    bulk.find(pageIdToIdFilter(urlId)).updateOne({
      $pull: {
        votesUp: uid,
        votesDown: uid,
      },
    });
    bulk.find(pageIdToIdFilter(urlId)).updateOne([updateVotesSumAggregation]);

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

const pageIdToIdFilter = (urlId: UrlId) => ({
  _id: {
    pageId: urlId.pageId,
    websiteId: urlId.websiteId,
  },
});
