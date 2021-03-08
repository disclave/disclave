import {Comment} from "./Comment";

export type {
  Comment
}

export interface ICommentService {
  getComments(url: string): Promise<Array<Comment>>

  addComment(idToken: string, text: string, url: string): Promise<Comment>
}
