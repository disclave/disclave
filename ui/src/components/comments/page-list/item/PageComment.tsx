import React from "react";
import { CommentActionsHandler, PageCommentModel } from "@/types";
import {
  CommentContent,
  CommentFooter,
  CommentTimestamp,
} from "@/components/comments/list-item";

export interface PageCommentProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  comment: PageCommentModel;
}

export const PageComment: React.VFC<PageCommentProps> = (props) => {
  return (
    <div className="px-2 py-1">
      <div className="mb-0.5">
        <span className="font-semibold text-sm">
          {props.comment.author.name}
        </span>
        <CommentTimestamp timestamp={props.comment.timestamp} />
      </div>

      <div id={props.comment.id} className="pt-32 -mt-32">
        <CommentContent text={props.comment.text} />
      </div>

      <CommentFooter
        actionsHandler={props.actionsHandler}
        authenticated={props.authenticated}
        className="mt-1"
        commentId={props.comment.id}
        votes={props.comment.votes}
      />
    </div>
  );
};
