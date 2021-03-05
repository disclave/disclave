import {Comment} from "./Comment";
import {CommentRepository} from "./db/CommentRepository";
import {CommentEntity} from "./db/CommentEntity";
import {getUrlService} from "../url";
import {getUserService} from "../users";

const repository = new CommentRepository()
const urlService = getUrlService()
const userService = getUserService()

export class CommentService {
  public async getComments(url: string): Promise<Array<Comment>> {
    const parsedUrl = urlService.parseUrl(url)
    const comments = await repository.findComments(parsedUrl)
    return comments.map(toDomain)
  }

  public async addComment(idToken: string, text: string, url: string): Promise<Comment> {
    const author = await userService.getProfile(idToken)
    const parsedUrl = urlService.parseUrl(url)
    const result = await repository.addComment(author, text, parsedUrl)
    return toDomain(result)
  }
}

const toDomain = (entity: CommentEntity): Comment => {
  return {
    id: entity.id,
    text: entity.text,
    author: {
      id: entity.author.id,
      name: entity.author.name
    },
    timestamp: entity.timestamp,
    urlMeta: {
      websiteId: entity.url.websiteId,
      pageId: entity.url.pageId
    }
  }
}
