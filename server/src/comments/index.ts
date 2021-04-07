import { Comment } from "./Comment";
import { IdToken } from "../auth";

export type { Comment };

export abstract class CommentService {
  abstract getComments(url: string): Promise<Array<Comment>>;

  abstract countComments(url: string): Promise<number>;

  abstract addComment(
    idToken: IdToken,
    text: string,
    url: string
  ): Promise<Comment>;

  abstract setVoteUp(commentId: string, idToken: IdToken): Promise<boolean>;
  abstract setVoteDown(commentId: string, idToken: IdToken): Promise<boolean>;
  abstract removeVote(commentId: string, idToken: IdToken): Promise<boolean>;
}
