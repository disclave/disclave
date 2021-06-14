export type CommentActionsHandler = {
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
  onVoteUp: (commentId: string) => Promise<void>;
};
