import * as React from "react";
import { CommentModel } from "./CommentModel";
import { DateTimePreview } from "../date/DateTimePreview";

interface CommentProps {
  comment: CommentModel;
}

export const Comment: React.VFC<CommentProps> = ({ comment }) => {
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
