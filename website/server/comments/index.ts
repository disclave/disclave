import {Comment} from "./Comment";
import {Port} from "../../helpers/Port";
import {CommentService} from "./CommentService";

export interface ICommentService {
  getComments(url: string): Promise<Array<Comment>>

  addComment(idToken: string, text: string, url: string): Promise<Comment>
}

export const commentService = new Port<ICommentService>(CommentService)