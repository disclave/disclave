import { CommentEntity, CommentRepository } from './db';
import { UrlService } from '../url';
import { UserService } from '../users';
import { CommentService, Comment } from './index';
import { inject, injectable } from 'inversify';

@injectable()
export class CommentServiceImpl implements CommentService {
  @inject(UrlService)
  private urlService: UrlService;

  @inject(UserService)
  private userService: UserService;

  @inject(CommentRepository)
  private repository: CommentRepository;

  public async getComments(url: string): Promise<Array<Comment>> {
    const parsedUrl = this.urlService.parseUrl(url);
    const comments = await this.repository.findComments(parsedUrl);
    return comments.map(toDomain);
  }

  public async addComment(idToken: string, text: string, url: string): Promise<Comment> {
    const author = await this.userService.getProfile(idToken);
    const parsedUrl = this.urlService.parseUrl(url);
    const result = await this.repository.addComment(author, text, parsedUrl);
    return toDomain(result);
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
  };
};
