export interface CommentAuthor {
  id: string;
  name: string;
}

export interface CommentVotes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface CommentUrlMeta {
  websiteId: string;
  pageId: string;
}

export interface CommentModel {
  id: string;
  text: string;
  timestamp: string;
  author: CommentAuthor;
  votes: CommentVotes;
  urlMeta: CommentUrlMeta;
}
