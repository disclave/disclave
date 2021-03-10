import React from "react";

import "./CommentsList.css";

import { CommentModel } from "../CommentModel";
import { ListItem } from "./item";

export interface CommentsListProps {
  className?: string;
  comments: Array<CommentModel>;
}

export const CommentsList: React.VFC<CommentsListProps> = ({
  comments,
  className = "",
}) => {
  const containerClasses = ["space-y-4", className].join(" ");

  return (
    <div className={containerClasses}>
      {comments.map((c) => (
        <ListItem key={c.id} comment={c} />
      ))}
    </div>
  );
};
