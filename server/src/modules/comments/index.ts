import { Comment } from "./models";
import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

export type { Comment };

export abstract class CommentService {
  abstract getComments(
    urlId: UrlId,
    userId: UserId | null
  ): Promise<Array<Comment>>;

  abstract getLatestComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Comment>>;

  abstract getTopComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Comment>>;

  abstract countComments(urlId: UrlId): Promise<number>;

  abstract addComment(
    userId: UserId,
    text: string,
    urlId: UrlId,
    rawUrl: string
  ): Promise<Comment>;
}
