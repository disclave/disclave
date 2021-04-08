export interface CommentAuthor {
  id: string;
  name: string;
}

export interface CommentVotes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface CommentModel {
  id: string;
  text: string;
  timestamp: string;
  author: CommentAuthor;
  votes: CommentVotes;
}
