import {Comment} from "./Comment";
import {CommentEntity, commentRepository, ICommentRepository} from "./db";
import {IUrlService, urlService} from "../url";
import {IUserService, userService} from "../users";
import {ICommentService} from "./index";

export class CommentService implements ICommentService {
  private repository: ICommentRepository
  private urlService: IUrlService
  private userService: IUserService

  public constructor() {
    this.repository = commentRepository.get()
    this.urlService = urlService.get()
    this.userService = userService.get()
  }

  public async getComments(url: string): Promise<Array<Comment>> {
    const parsedUrl = this.urlService.parseUrl(url)
    const comments = await this.repository.findComments(parsedUrl)
    return comments.map(toDomain)
  }

  public async addComment(idToken: string, text: string, url: string): Promise<Comment> {
    const author = await this.userService.getProfile(idToken)
    const parsedUrl = this.urlService.parseUrl(url)
    const result = await this.repository.addComment(author, text, parsedUrl)
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
