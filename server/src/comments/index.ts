import { Comment } from "./Comment";

export type { Comment };

export abstract class CommentService {
  abstract getComments(url: string): Promise<Array<Comment>>;

  abstract countComments(url: string): Promise<number>;

  abstract addComment(
    idToken: string,
    text: string,
    url: string
  ): Promise<Comment>;
}
