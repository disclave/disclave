import React from "react";
import {
  CommentActionsHandler,
  CommentModel,
} from "@/components/comments/CommentModel";
import { DateTimePreview } from "@/components/date/dateTimePreview";
import { ListItemFooter } from "@/components/comments/list/item";

export interface PageListItemProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  comment: CommentModel;
}

export const PageListItem: React.VFC<PageListItemProps> = (props) => {
  return (
    <div>
      <div className="mb-0.5">
        <span className="font-semibold text-sm">
          {props.comment.author.name}
        </span>
        <DateTimePreview
          className="ml-2 font-light text-xs"
          iso={props.comment.timestamp}
        />
      </div>

      <div id={props.comment.id} className="pt-32 -mt-32">
        <p
          className="text-sm whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: props.comment.text.trim() }}
        />
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
