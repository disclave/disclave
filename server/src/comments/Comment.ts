export interface CommentUrlMeta {
  websiteId: string;
  pageId: string;
}

export interface CommentAuthor {
  id: string;
  name: string;
}

interface Votes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface Comment {
  id: string;
  text: string;
  author: CommentAuthor;
  votes: Votes;
  timestamp: string;
  urlMeta: CommentUrlMeta;
}
