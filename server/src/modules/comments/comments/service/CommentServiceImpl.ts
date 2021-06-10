import {
  CommentEntity,
  CommentRepository,
} from "@/modules/comments/comments/db";
import { ProfileService } from "@/modules/profiles";
import { CommentService, Comment } from "./index";
import { inject, injectable } from "inversify";
import escapeHtml from "escape-html";
import { CommentTextMaxLength, CommentTextMinLength } from "./exceptions";
import { UserId } from "@/modules/auth";
import { PageService, UrlId } from "@/modules/pages";

@injectable()
export class CommentServiceImpl implements CommentService {
  @inject(ProfileService)
  private profileService: ProfileService;

  @inject(PageService)
  private pageService: PageService;

  @inject(CommentRepository)
  private repository: CommentRepository;

  public async getComments(
    urlId: UrlId,
    userId: UserId | null
  ): Promise<Array<Comment>> {
    const comments = await this.repository.findComments(urlId, userId);
    return comments.map(toDomain);
  }

  public async countComments(urlId: UrlId): Promise<number> {
    return await this.repository.countComments(urlId);
  }

  public async addComment(
    uid: UserId,
    text: string,
    urlId: UrlId,
    rawUrl: string
  ): Promise<Comment> {
    const escapedText = validateAndParseCommentText(text);

    const authorPromise = this.profileService.getProfile(uid);
    const pageMetaPromise = this.pageService.getSavedPageMeta(urlId);

    const result = await this.repository.addComment(
      await authorPromise,
      escapedText,
      {
        urlId,
        rawUrl,
        urlMeta: await pageMetaPromise,
      }
    );
    return toDomain(result);
  }
}

function validateAndParseCommentText(text: string): string {
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
}

function toDomain(entity: CommentEntity): Comment {
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
}
