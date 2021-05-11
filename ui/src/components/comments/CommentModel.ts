export type CommentActionsHandler = {
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
  onVoteUp: (commentId: string) => Promise<void>;
};

export interface CommentAuthor {
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
