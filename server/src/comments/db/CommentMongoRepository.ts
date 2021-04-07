import { CommentEntity } from "./CommentEntity";
import { AuthorInfo, CommentRepository, UrlMeta } from "./index";
import { injectable } from "inversify";
import { db, Timestamp, ObjectID } from "../../mongodb";

interface DbComment {
  _id?: ObjectID;
  text: string;
  author: {
    id: string;
    name: string;
  };
  timestamp: Timestamp;
  url: {
    raw: string;
    websiteId: string;
    pageId: string;
  };
}

@injectable()
export class CommentMongoRepository implements CommentRepository {
  public async findComments(url: UrlMeta): Promise<Array<CommentEntity>> {
    const collection = await commentsDbCollection();
    const cursor = collection.find(urlMetaToQuery(url)).sort({ timestamp: -1 });
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

    const doc = await collection.findOne({
      _id: result.insertedId,
    });
    return cursorDocToEntity(doc);
  }
}

const urlMetaToQuery = (url: UrlMeta) => {
  return {
    "url.websiteId": url.websiteId,
    "url.pageId": url.pageId,
  };
};

const toDbComment = (
  author: AuthorInfo,
  text: string,
  url: UrlMeta
): DbComment => ({
  text: text,
  author: {
    id: author.id,
    name: author.name,
  },
  timestamp: new Timestamp(0, Math.floor(new Date().getTime() / 1000)),
  url: {
    raw: url.raw,
    websiteId: url.websiteId,
    pageId: url.pageId,
  },
});

const cursorDocToEntity = (doc: DbComment): CommentEntity => ({
  id: doc._id.toHexString(),
  text: doc.text,
  author: {
    id: doc.author.id,
    name: doc.author.name,
  },
  timestamp: new Date(doc.timestamp.getHighBits() * 1000).toUTCString(),
  url: {
    raw: doc.url.raw,
    websiteId: doc.url.websiteId,
    pageId: doc.url.pageId,
  },
});

const websitesCollection = "websites";
const pagesCollection = "pages";
const commentsCollection = "comments";

const commentsDbCollection = async () => {
  return (await db()).collection<DbComment>(
    `${websitesCollection}.${pagesCollection}.${commentsCollection}`
  );
};
