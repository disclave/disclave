export interface CommentAuthor {
  id: string;
  name: string;
}

export interface CommentModel {
  id: string;
  text: string;
  timestamp: string;
  author: CommentAuthor;
}
