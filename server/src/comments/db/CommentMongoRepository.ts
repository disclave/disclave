import { CommentEntity } from "./CommentEntity";
import { AuthorInfo, CommentRepository, UrlMeta } from "./index";
import { injectable } from "inversify";
import { db, Db } from "../../mongodb";

@injectable()
export class CommentFirestoreRepository implements CommentRepository {
  public async findComments(url: UrlMeta): Promise<Array<CommentEntity>> {
    const cursor = commentsDbCollection(db()).find({
      "url.websiteId": url.websiteId,
      "url.pageId": url.pageId,
    }).sort({ timestamp: -1 });
    return await cursor.map(cursorDocToEntity).toArray();
  }

  public async addComment(
    author: AuthorInfo,
    text: string,
    url: UrlMeta
  ): Promise<CommentEntity> {
    const result = await commentsDbCollection(db())
      .insertOne(toCommentEntity(author, text, url));
  
    const doc = await commentsDbCollection(db()).findOne({_id: result.insertedId});
    return await cursorDocToEntity(doc);
  }
}

const toCommentEntity = (
  author: AuthorInfo,
  text: string,
  url: UrlMeta
): CommentEntity => ({
  id: "", // TODO: how to set id?
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

const cursorDocToEntity = (doc: any): CommentEntity => ({
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

const commentsDbCollection = (db: Db) => {
  return db.collection(`${websitesCollection}.${pagesCollection}.${commentsCollection}`);
};
