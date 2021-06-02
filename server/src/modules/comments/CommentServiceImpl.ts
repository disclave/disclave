import { CommentEntity, CommentRepository } from "./db";
import { ProfileService } from "@/modules/profiles";
import { CommentService, Comment } from "./index";
import { inject, injectable } from "inversify";
import escapeHtml from "escape-html";
import { CommentTextMaxLength, CommentTextMinLength } from "./exceptions";
import { UserId } from "@/modules/auth";
import { PageService } from "@/modules/pages";

@injectable()
export class CommentServiceImpl implements CommentService {
  @inject(PageService)
  private pageService: PageService;

  @inject(ProfileService)
  private profileService: ProfileService;

  @inject(CommentRepository)
  private repository: CommentRepository;

  public async getComments(
    url: string,
    userId: UserId | null
  ): Promise<Array<Comment>> {
    throw "FIXME";
    // const pageData = await this.pageService.getPageData(url);
    // const comments = await this.repository.findComments(parsedUrl, userId); // FIXME
    // return comments.map(toDomain);
  }

  public async getLatestComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Comment>> {
    const comments = await this.repository.findLatestComments(
      minVoteSum,
      limit,
      userId
    );
    return comments.map(toDomain);
  }

  public async getTopComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Comment>> {
    const comments = await this.repository.findTopComments(
      minVoteSum,
      limit,
      userId
    );
    return comments.map(toDomain);
  }

  public async countComments(url: string): Promise<number> {
    throw "FIXME";
    // const pageData = await this.pageService.getPageData(url);
    // return await this.repository.countComments(parsedUrl); // FIXME
  }

  public async addComment(
    uid: UserId,
    text: string,
    url: string
  ): Promise<Comment> {
    throw "FIXME";
    // const author = await this.profileService.getProfile(uid);
    // const pageData = await this.pageService.getPageData(url);
    // const escapedText = validateAndParseCommentText(text);
    // const result = await this.repository.addComment(
    //   author,
    //   escapedText,
    //   parsedUrl // FIXME
    // );
    // return toDomain(result);
  }

  public async removeVote(commentId: string, userId: UserId): Promise<boolean> {
    return await this.repository.removeVote(commentId, userId);
  }

  public async setVoteDown(
    commentId: string,
    userId: UserId
  ): Promise<boolean> {
    return await this.repository.setVoteDown(commentId, userId);
  }

  public async setVoteUp(commentId: string, userId: UserId): Promise<boolean> {
    return await this.repository.setVoteUp(commentId, userId);
  }
}

const validateAndParseCommentText = (text: string): string => {
  if (text.length < 1)
    throw CommentTextMinLength(
      "Comment text must contain at least one character."
    );

  const maxLen = 10000;
  if (text.length > maxLen)
    throw CommentTextMaxLength(
      `Comment text can not be longer than ${maxLen} characters`
    );

  return escapeHtml(text);
};

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
