import * as React from "react";
import { CommentModel } from "../CommentModel";
import { ListItem } from "./ListItem";

export interface CommentsListProps {
  comments: CommentModel[];
}

export const CommentsList: React.VFC<CommentsListProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((c) => (
        <ListItem comment={c} />
      ))}
    </div>
  );
};
