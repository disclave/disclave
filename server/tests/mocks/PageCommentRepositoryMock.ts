import {
  AuthorInfo,
  PageCommentEntity,
  PageCommentRepository,
  UrlData,
} from "@/modules/comments/page/db";
import { injectable } from "inversify";
import { UrlId } from "@/modules/pages";

type DBPage = Array<PageCommentEntity>;
type DBWebsite = Map<string, DBPage>;
type DB = Map<string, DBWebsite>;

@injectable()
export class PageCommentRepositoryMock implements PageCommentRepository {
  public static db: DB = new Map<string, DBWebsite>();
  public static mockDate = new Date(1615190730000);

  public static deleteAll() {
    this.db.clear();
  }

  async runTransaction(run: (t: unknown) => Promise<unknown>): Promise<void> {
    await run({});
  }

  async addPageComment(
    author: AuthorInfo,
    text: string,
    urlData: UrlData
  ): Promise<PageCommentEntity> {
    const entity: PageCommentEntity = {
      id: "random-id-" + Math.random(),
      text: text,
      author: {
        name: author.name,
      },
      votes: {
        votedUp: true,
        votedDown: false,
        sum: 1,
      },
      timestamp: PageCommentRepositoryMock.mockDate.toISOString(),
    };

    const db = PageCommentRepositoryMock.db;
    if (!db.has(urlData.urlId.websiteId))
      db.set(urlData.urlId.websiteId, new Map<string, DBPage>());

    const website = db.get(urlData.urlId.websiteId)!;
    if (!website.has(urlData.urlId.pageId))
      website.set(urlData.urlId.pageId, new Array<PageCommentEntity>());

    const page = website.get(urlData.urlId.pageId)!;
    page.push(entity);

    return entity;
  }

  async findPageComments(urlId: UrlId): Promise<Array<PageCommentEntity>> {
    const db = PageCommentRepositoryMock.db;
    if (!db.has(urlId.websiteId)) return [];

    const website = db.get(urlId.websiteId)!;
    if (!website.has(urlId.pageId)) return [];

    return website.get(urlId.pageId)!;
  }
}
