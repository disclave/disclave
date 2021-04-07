import { CommentEntity, CommentRepository } from "./db";
import { UrlService } from "../url";
import { UserService } from "../users";
import { CommentService, Comment } from "./index";
import { inject, injectable } from "inversify";
import { IdToken } from "../auth";

@injectable()
export class CommentServiceImpl implements CommentService {
  @inject(UrlService)
  private urlService: UrlService;

  @inject(UserService)
  private userService: UserService;

  @inject(CommentRepository)
  private repository: CommentRepository;

  public async getComments(
    url: string,
    idToken: IdToken | null
  ): Promise<Array<Comment>> {
    const uid = idToken ? await this.userService.verifyIdToken(idToken) : null;
    const parsedUrl = this.urlService.parseUrl(url);
    const comments = await this.repository.findComments(parsedUrl, uid);
    return comments.map(toDomain);
  }

  public async countComments(url: string): Promise<number> {
    const parsedUrl = this.urlService.parseUrl(url);
    return await this.repository.countComments(parsedUrl);
  }

  public async addComment(
    idToken: IdToken,
    text: string,
    url: string
  ): Promise<Comment> {
    const author = await this.userService.getProfile(idToken);
    const parsedUrl = this.urlService.parseUrl(url);
    const result = await this.repository.addComment(author, text, parsedUrl);
    return toDomain(result);
  }

  public async removeVote(
    commentId: string,
    idToken: IdToken
  ): Promise<boolean> {
    const uid = await this.userService.verifyIdToken(idToken);
    return await this.repository.removeVote(commentId, uid);
  }

  public async setVoteDown(
    commentId: string,
    idToken: IdToken
  ): Promise<boolean> {
    const uid = await this.userService.verifyIdToken(idToken);
    return await this.repository.setVoteDown(commentId, uid);
  }

  public async setVoteUp(
    commentId: string,
    idToken: IdToken
  ): Promise<boolean> {
    const uid = await this.userService.verifyIdToken(idToken);
    return await this.repository.setVoteUp(commentId, uid);
  }
}

const toDomain = (entity: CommentEntity): Comment => {
  return {
    id: entity.id,
    text: entity.text,
    author: {
      id: entity.author.id,
      name: entity.author.name,
    },
    votes: {
      sum: entity.votes.sum,
      votedUp: entity.votes.votedUp,
      votedDown: entity.votes.votedDown,
    },
    timestamp: entity.timestamp,
    urlMeta: {
      websiteId: entity.url.websiteId,
      pageId: entity.url.pageId,
    },
  };
};
