import React from "react";

import "./CommentsList.css";

import { CommentModel } from "../CommentModel";
import { ListItem } from "./item";

export interface CommentsListProps {
  comments: Array<CommentModel>;
}

export const CommentsList: React.VFC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <ListItem key={c.id} comment={c} />
      ))}
    </div>
  );
};
