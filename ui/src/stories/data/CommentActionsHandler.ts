import { CommentActionsHandler } from "@/types/CommentActionsHandler";

export const EmptyActionHandler: CommentActionsHandler = {
  onVoteDown: async () => {},
  onVoteRemove: async () => {},
  onVoteUp: async () => {},
};
