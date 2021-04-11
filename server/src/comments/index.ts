import { Comment } from "./Comment";
import { UserId } from "../auth";

export type { Comment };

export abstract class CommentService {
  abstract getComments(
    url: string,
    userId: UserId | null
  ): Promise<Array<Comment>>;

  abstract getTopComments(
    limit: number,
    userId: UserId | null
  ): Promise<Array<Comment>>;

  abstract countComments(url: string): Promise<number>;

  abstract addComment(
    userId: UserId,
    text: string,
    url: string
  ): Promise<Comment>;

  abstract setVoteUp(commentId: string, userId: UserId): Promise<boolean>;
  abstract setVoteDown(commentId: string, userId: UserId): Promise<boolean>;
  abstract removeVote(commentId: string, userId: UserId): Promise<boolean>;
}
