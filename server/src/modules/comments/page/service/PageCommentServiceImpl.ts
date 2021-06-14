import {
  PageCommentEntity,
  PageCommentRepository,
} from "@/modules/comments/page/db";
import { ProfileService } from "@/modules/profiles";
import { PageCommentService, PageComment } from "./index";
import { inject, injectable } from "inversify";
import escapeHtml from "escape-html";
import { CommentTextMaxLength, CommentTextMinLength } from "./exceptions";
import { UserId } from "@/modules/auth";
import { PageService, UrlId } from "@/modules/pages";

@injectable()
export class PageCommentServiceImpl implements PageCommentService {
  @inject(ProfileService)
  private profileService: ProfileService;

  @inject(PageService)
  private pageService: PageService;

  @inject(PageCommentRepository)
  private repository: PageCommentRepository;

  public async getPageComments(
    urlId: UrlId,
    userId: UserId | null
  ): Promise<Array<PageComment>> {
    const comments = await this.repository.findPageComments(urlId, userId);
    return comments.map(toDomain);
  }

  public async addPageComment(
    uid: UserId,
    text: string,
    urlId: UrlId,
    rawUrl: string
  ): Promise<PageComment> {
    const escapedText = validateAndParseCommentText(text);

    const authorPromise = this.profileService.getProfile(uid);
    const pageMetaPromise = this.pageService.getSavedPageMeta(urlId);

    const result = await this.repository.addPageComment(
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

function toDomain(entity: PageCommentEntity): PageComment {
  return {
    id: entity.id,
    text: entity.text,
    author: {
      name: entity.author.name,
    },
    votes: {
      sum: entity.votes.sum,
      votedUp: entity.votes.votedUp,
      votedDown: entity.votes.votedDown,
    },
    timestamp: entity.timestamp,
  };
}
