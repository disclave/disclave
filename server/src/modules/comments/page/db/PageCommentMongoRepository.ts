import {
  AuthorInfo,
  PageCommentRepository,
  UrlData,
  PageCommentEntity,
} from "./index";
import { injectable } from "inversify";
import {
  Timestamp,
  MongoRepository,
  ClientSession,
} from "@/connectors/mongodb";
import { UserId } from "@/modules/auth";
import { commentsDbCollection, getProjection } from "@/database/comments";
import { DbComment } from "@/database";
import { UrlId } from "@/modules/pages";

@injectable()
export class PageCommentMongoRepository
  extends MongoRepository
  implements PageCommentRepository<ClientSession> {
  public async findPageComments(
    urlId: UrlId,
    uid: UserId | null
  ): Promise<Array<PageCommentEntity>> {
    const collection = await commentsDbCollection();
    const cursor = collection
      .find(urlIdToQuery(urlId), {
        projection: getProjection(uid),
      })
      .sort({ timestamp: -1 });

    return await cursor.map(cursorDocToEntity).toArray();
  }

  public async addPageComment(
    author: AuthorInfo,
    text: string,
    urlData: UrlData
  ): Promise<PageCommentEntity> {
    const comment = toDbComment(author, text, urlData);

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
}

function urlIdToQuery(urlId: UrlId) {
  return {
    "url.websiteId": urlId.websiteId,
    "url.pageId": urlId.pageId,
  };
}

function toDbComment(
  author: AuthorInfo,
  text: string,
  urlData: UrlData
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
      raw: urlData.rawUrl,
      websiteId: urlData.urlId.websiteId,
      pageId: urlData.urlId.pageId,
      meta: urlData.urlMeta
        ? {
            logo: urlData.urlMeta.logo ?? null,
            title: urlData.urlMeta.title ?? null,
          }
        : null,
    },
  };
}

function cursorDocToEntity(doc: DbComment): PageCommentEntity {
  return {
    id: doc._id.toHexString(),
    text: doc.text,
    author: {
      name: doc.author.name,
    },
    votes: {
      sum: doc.votesSum,
      votedUp: doc.votesUp?.length > 0,
      votedDown: doc.votesDown?.length > 0,
    },
    timestamp: new Date(doc.timestamp.getHighBits() * 1000).toUTCString(),
  };
}
