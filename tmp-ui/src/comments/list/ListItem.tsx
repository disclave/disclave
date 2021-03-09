import * as React from "react";
import { CommentModel } from "../CommentModel";
import { DateTimePreview } from "../../date/DateTimePreview";

export interface ListItemProps {
  comment: CommentModel;
}

export const ListItem: React.VFC<ListItemProps> = ({ comment }) => {
  return (
    <div>
      <div>
        <div>{comment.author.name}</div>
        <div>
          <DateTimePreview iso={comment.timestamp} />
        </div>
      </div>
      <div>{comment.text}</div>
    </div>
  );
};
