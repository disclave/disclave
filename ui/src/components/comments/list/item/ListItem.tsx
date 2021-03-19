import React from "react";
import { CommentModel } from "../../CommentModel";
import { DateTimePreview } from "../../../date/dateTimePreview";

export interface ListItemProps {
  comment: CommentModel;
}

export const ListItem: React.VFC<ListItemProps> = ({ comment }) => {
  return (
    <div>
      <div>
        <span className="font-semibold">{comment.author.name}</span>
        <span className="ml-2 font-light text-sm">
          <DateTimePreview iso={comment.timestamp} />
        </span>
      </div>
      <div className="mt-1">
        <p>{comment.text}</p>
      </div>
    </div>
  );
};
