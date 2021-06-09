import {
  AuthorInfo,
  CommentEntity,
  CommentRepository,
} from "@/modules/comments/db";
import { injectable } from "inversify";
import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

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
    urlId: UrlId,
    rawUrl: string
  ): Promise<CommentEntity> {
    const entity: CommentEntity = {
      id: "random-id-" + Math.random(),
      text: text,
      author: {
        id: author.uid,
        name: author.name,
      },
      votes: {
        votedUp: true,
        votedDown: false,
        sum: 1,
      },
      timestamp: CommentRepositoryMock.mockDate.toISOString(),
      url: {
        raw: rawUrl,
        websiteId: urlId.websiteId,
        pageId: urlId.pageId,
      },
    };

    const db = CommentRepositoryMock.db;
    if (!db.has(urlId.websiteId))
      db.set(urlId.websiteId, new Map<string, DBPage>());

    const website = db.get(urlId.websiteId)!;
    if (!website.has(urlId.pageId))
      website.set(urlId.pageId, new Array<CommentEntity>());

    const page = website.get(urlId.pageId)!;
    page.push(entity);

    return entity;
  }

  async countComments(urlId: UrlId): Promise<number> {
    const db = CommentRepositoryMock.db;
    if (!db.has(urlId.websiteId)) return 0;

    const website = db.get(urlId.websiteId)!;
    if (!website.has(urlId.pageId)) return 0;

    return website.get(urlId.pageId)!.length;
  }

  async findComments(urlId: UrlId): Promise<Array<CommentEntity>> {
    const db = CommentRepositoryMock.db;
    if (!db.has(urlId.websiteId)) return [];

    const website = db.get(urlId.websiteId)!;
    if (!website.has(urlId.pageId)) return [];

    return website.get(urlId.pageId)!;
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

  findLatestComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<CommentEntity>> {
    return Promise.resolve(undefined);
  }

  findTopComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<CommentEntity>> {
    return Promise.resolve(undefined);
  }
}
