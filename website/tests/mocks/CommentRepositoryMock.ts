import {AuthorInfo, CommentEntity, CommentRepository, UrlMeta} from "../../server/comments/db";
import {injectable} from "inversify";

type DBPage = Array<CommentEntity>
type DBWebsite = Map<string, DBPage>
type DB = Map<string, DBWebsite>

@injectable()
export class CommentRepositoryMock implements CommentRepository {

  public static db: DB = new Map<string, DBWebsite>()
  public static mockDate = new Date(1615190730000)

  public static deleteAll() {
    this.db.clear()
  }

  async addComment(author: AuthorInfo, text: string, url: UrlMeta): Promise<CommentEntity> {
    const entity: CommentEntity = {
      id: 'random-id-' + Math.random(),
      text: text,
      author: {
        id: author.id,
        name: author.name
      },
      timestamp: CommentRepositoryMock.mockDate.toISOString(),
      url: {
        raw: url.raw,
        websiteId: url.websiteId,
        pageId: url.pageId
      }
    }

    const db = CommentRepositoryMock.db
    if (!db.has(url.websiteId))
      db.set(url.websiteId, new Map<string, DBPage>())

    const website = db.get(url.websiteId)!
    if (!website.has(url.pageId))
      website.set(url.pageId, new Array<CommentEntity>())

    const page = website.get(url.pageId)!
    page.push(entity)

    return entity
  }

  async findComments(url: UrlMeta): Promise<Array<CommentEntity>> {
    const db = CommentRepositoryMock.db
    if (!db.has(url.websiteId))
      return []

    const website = db.get(url.websiteId)!
    if (!website.has(url.pageId))
      return []

    return website.get(url.pageId)!
  }
}