import { Comment } from "./Comment";

export type { Comment };

export abstract class CommentService {
  abstract getComments(
    url: string,
    userId: string | null
  ): Promise<Array<Comment>>;

  abstract getLatestComments(
    minVoteSum: number,
    limit: number,
    userId: string | null
  ): Promise<Array<Comment>>;

  abstract getTopComments(
    minVoteSum: number,
    limit: number,
    userId: string | null
  ): Promise<Array<Comment>>;

  abstract countComments(url: string): Promise<number>;

  abstract addComment(
    userId: string,
    text: string,
    url: string
  ): Promise<Comment>;

  abstract setVoteUp(commentId: string, userId: string): Promise<boolean>;
  abstract setVoteDown(commentId: string, userId: string): Promise<boolean>;
  abstract removeVote(commentId: string, userId: string): Promise<boolean>;
}
