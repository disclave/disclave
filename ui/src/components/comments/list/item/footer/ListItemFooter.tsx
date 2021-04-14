import React from "react";
import {
  CommentActionsHandler,
  CommentModel,
} from "@/components/comments/CommentModel";
import { CommentVote } from "@/components/comments/list/item/vote";

export interface ListItemFooterProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  className?: string;
  comment: CommentModel;
}

export const ListItemFooter: React.VFC<ListItemFooterProps> = ({
  authenticated,
  className,
  comment,
  actionsHandler,
}) => {
  return (
    <div className={className}>
      <CommentVote
        commentId={comment.id}
        enabled={authenticated}
        votes={comment.votes}
        onVoteUp={actionsHandler.onVoteUp}
        onVoteDown={actionsHandler.onVoteDown}
        onVoteRemove={actionsHandler.onVoteRemove}
      />
    </div>
  );
};
