import { CommentVotesModel } from ".";

interface Author {
  name: string;
}

export interface PageCommentModel {
  id: string;
  text: string;
  timestamp: string;
  author: Author;
  votes: CommentVotesModel;
}
