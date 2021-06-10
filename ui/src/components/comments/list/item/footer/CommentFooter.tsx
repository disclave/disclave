import React from "react";
import { CommentVote } from "./vote";
import { CommentActionsHandler, CommentVotesModel } from "@/types";

export interface CommentFooterProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  className?: string;
  commentId: string;
  votes: CommentVotesModel;
}

export const CommentFooter: React.VFC<CommentFooterProps> = ({
  actionsHandler,
  authenticated,
  className,
  commentId,
  votes,
}) => {
  return (
    <div className={className}>
      <CommentVote
        commentId={commentId}
        enabled={authenticated}
        votes={votes}
        onVoteUp={actionsHandler.onVoteUp}
        onVoteDown={actionsHandler.onVoteDown}
        onVoteRemove={actionsHandler.onVoteRemove}
      />
    </div>
  );
};
