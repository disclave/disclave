import {
  AuthorInfo,
  CommentEntity,
  CommentRepository,
  UrlMeta,
} from "../../src/comments/db";
import { injectable } from "inversify";
import { UserId } from "../../src/auth";

type DBPage = Array<CommentEntity>;
type DBWebsite = Map<string, DBPage>;
type DB = Map<string, DBWebsite>;

@injectable()
export class CommentRepositoryMock implements CommentRepository {
  public static db: DB = new Map<string, DBWebsite>();
  public static mockDate = new Date(1615190730000);

  public static deleteAll() {
    this.db.clear();
  }

  async runTransaction(run: (t: unknown) => Promise<unknown>): Promise<void> {
    await run({});
  }

  async addComment(
    author: AuthorInfo,
    text: string,
    url: UrlMeta
  ): Promise<CommentEntity> {
    const entity: CommentEntity = {
      id: "random-id-" + Math.random(),
      text: text,
      author: {
        id: author.id,
        name: author.name,
      },
      votes: {
        votedUp: true,
        votedDown: false,
        sum: 1,
      },
      timestamp: CommentRepositoryMock.mockDate.toISOString(),
      url: {
        raw: url.raw,
        websiteId: url.websiteId,
        pageId: url.pageId,
      },
    };

    const db = CommentRepositoryMock.db;
    if (!db.has(url.websiteId))
      db.set(url.websiteId, new Map<string, DBPage>());

    const website = db.get(url.websiteId)!;
    if (!website.has(url.pageId))
      website.set(url.pageId, new Array<CommentEntity>());

    const page = website.get(url.pageId)!;
    page.push(entity);

    return entity;
  }

  async countComments(url: UrlMeta): Promise<number> {
    const db = CommentRepositoryMock.db;
    if (!db.has(url.websiteId)) return 0;

    const website = db.get(url.websiteId)!;
    if (!website.has(url.pageId)) return 0;

    return website.get(url.pageId)!.length;
  }

  async findComments(url: UrlMeta): Promise<Array<CommentEntity>> {
    const db = CommentRepositoryMock.db;
    if (!db.has(url.websiteId)) return [];

    const website = db.get(url.websiteId)!;
    if (!website.has(url.pageId)) return [];

    return website.get(url.pageId)!;
  }

  async removeVote(commentId: string, uid: UserId): Promise<boolean> {
    return true;
  }

  async setVoteDown(commentId: string, uid: UserId): Promise<boolean> {
    return true;
  }

  async setVoteUp(commentId: string, uid: UserId): Promise<boolean> {
    return true;
  }
}
