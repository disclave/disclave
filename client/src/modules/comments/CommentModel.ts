export interface CommentUrlMeta {
  websiteId: string;
  pageId: string;
}

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
  author: CommentAuthor;
  votes: CommentVotes;
  timestamp: string;
  urlMeta: CommentUrlMeta;
}
