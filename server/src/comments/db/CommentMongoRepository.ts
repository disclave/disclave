import { CommentEntity } from "./CommentEntity";
import { AuthorInfo, CommentRepository, UrlMeta } from "./index";
import { injectable } from "inversify";
import { Db, db } from "../../mongodb";

const DbFields = {
  _id: "_id",
  text: "text",
  author: { 
    _: "author",
    id: "id",
    name: "name",
  },
  timestamp: "timestamp",
  url: {
    _: "url",
    raw: "raw",
    websiteId: "websiteId",
    pageId: "pageId",
  }
} as const;

interface DbComment {
  [DbFields._id]?: string;
  [DbFields.text]: string;
  [DbFields.author._]: {
    [DbFields.author.id]: string;
    [DbFields.author.name]: string;
  };
  [DbFields.timestamp]: string;
  [DbFields.url._]: {
    [DbFields.url.raw]: string;
    [DbFields.url.websiteId]: string;
    [DbFields.url.pageId]: string;
  };
}

@injectable()
export class CommentFirestoreRepository implements CommentRepository {
  public async findComments(url: UrlMeta): Promise<Array<CommentEntity>> {
    const cursor = commentsDbCollection().find({
      [DbFields.url._]: { [DbFields.url.websiteId]: url.websiteId },
      [DbFields.url._]: { [DbFields.url.pageId]: url.pageId },
    }).sort({ [DbFields.timestamp]: -1 });
    return await cursor.map(cursorDocToEntity).toArray();
  }

  public async addComment(
    author: AuthorInfo,
    text: string,
    url: UrlMeta
  ): Promise<CommentEntity> {
    const result = await commentsDbCollection()
      .insertOne(toDbComment(author, text, url));
  
    const doc = await commentsDbCollection().findOne({ [DbFields._id]: result.insertedId});
    return cursorDocToEntity(doc);
  }
}

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
  timestamp: new Date().toUTCString(), // TODO: test this
  url: {
    raw: url.raw,
    websiteId: url.websiteId,
    pageId: url.pageId,
  },
});

const cursorDocToEntity = (doc: DbComment): CommentEntity => ({
  id: doc._id,
  text: doc.text,
  author: {
    id: doc.author.id,
    name: doc.author.name,
  },
  timestamp: doc.timestamp,
  url: {
    raw: doc.url.raw,
    websiteId: doc.url.websiteId,
    pageId: doc.url.pageId,
  },
});

const websitesCollection = "websites";
const pagesCollection = "pages";
const commentsCollection = "comments";

const commentsDbCollection = () => {
  return db().collection(`${websitesCollection}.${pagesCollection}.${commentsCollection}`);
};
