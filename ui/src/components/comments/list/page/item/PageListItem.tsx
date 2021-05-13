import React from "react";
import {
  CommentActionsHandler,
  CommentModel,
} from "@/components/comments/CommentModel";
import {
  ListItemContent,
  ListItemFooter,
  ListItemTimestamp,
} from "@/components/comments/list/item";

export interface PageListItemProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  comment: CommentModel;
}

export const PageListItem: React.VFC<PageListItemProps> = (props) => {
  return (
    <div className="px-2 py-1">
      <div className="mb-0.5">
        <span className="font-semibold text-sm">
          {props.comment.author.name}
        </span>
        <ListItemTimestamp comment={props.comment} />
      </div>

      <div id={props.comment.id} className="pt-32 -mt-32">
        <ListItemContent comment={props.comment} />
      </div>

      <ListItemFooter
        actionsHandler={props.actionsHandler}
        authenticated={props.authenticated}
        className="mt-1"
        comment={props.comment}
      />
    </div>
  );
};
