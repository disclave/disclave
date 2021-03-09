import React from "react";

import "./ListItem.css";

import { CommentModel } from "../../CommentModel";
import { DateTimePreview } from "../../../date/dateTimePreview";

export interface ListItemProps {
  comment: CommentModel;
}

export const ListItem: React.VFC<ListItemProps> = ({ comment }) => {
  return (
    <div>
      <div>
        <div className="font-semibold">@{comment.author.name}</div>
        <div className="font-light text-sm">
          <DateTimePreview iso={comment.timestamp} />
        </div>
      </div>
      <div className="mt-2">
        <p>{comment.text}</p>
      </div>
    </div>
  );
};
