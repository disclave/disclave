import {Comment} from "./Comment";
import {CommentRepository} from "./db/CommentRepository";
import {CommentEntity} from "./db/CommentEntity";
import {UrlService} from "../url/UrlService";

const repository = new CommentRepository()
const urlService = new UrlService()

export class CommentService {
  public async getComments(url: string): Promise<Array<Comment>> {
    const parsedUrl = urlService.parseUrl(url)
    const comments = await repository.findComments(parsedUrl.websiteId, parsedUrl.pageId)
    return comments.map(toDomain)
  }

  public async addComment(text: string, url: string): Promise<Comment> {
    const parsedUrl = urlService.parseUrl(url)
    const result = await repository.addComment(text, parsedUrl)
    return toDomain(result)
  }
}

const toDomain = (entity: CommentEntity): Comment => {
  return {
    id: entity.id,
    text: entity.text,
    timestamp: entity.timestamp,
    urlMeta: {
      websiteId: entity.url.websiteId,
      pageId: entity.url.pageId
    }
  }
}
