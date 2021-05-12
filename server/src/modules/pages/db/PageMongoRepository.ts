import { PageEntity } from "./PageEntity";
import { PageRepository } from "./index";
import { injectable } from "inversify";
import { MongoRepository } from "@/connectors/mongodb";
import { ClientSession } from "mongodb";

@injectable()
export class PageMongoRepository
  extends MongoRepository
  implements PageRepository<ClientSession> {
  
  public async findTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number,
  ): Promise<Array<PageEntity>> {
    // TODO
    return [];
    // const collection = await commentsDbCollection();
    // const cursor = collection
    //   .find(
    //     {
    //       votesSum: { $gte: minVoteSum },
    //     }
    //   )
    //   .sort({ votesSum: -1 })
    //   .limit(limit);

    // return await cursor.map(cursorDocToEntity).toArray();
  }
}

// const cursorDocToEntity = (doc: DbComment): PageEntity => {
//   return {
//     id: doc._id.toHexString(),
//     text: doc.text,
//     author: {
//       id: asUserId(doc.author.id),
//       name: doc.author.name,
//     },
//     votes: {
//       sum: doc.votesSum,
//       votedUp: doc.votesUp?.length > 0,
//       votedDown: doc.votesDown?.length > 0,
//     },
//     timestamp: new Date(doc.timestamp.getHighBits() * 1000).toUTCString(),
//     url: {
//       raw: doc.url.raw,
//       websiteId: doc.url.websiteId,
//       pageId: doc.url.pageId,
//     },
//   };
// };
