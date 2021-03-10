import * as React from "react";
import { CommentModel } from "./CommentModel";
import { CommentsList } from "./list";
import { CommentAddForm } from "./add";
import "./CommentsContainer.css";

export interface CommentsContainerProps {
  comments: Array<CommentModel>;
  onSubmit: (text: string) => Promise<void>;
}

export const CommentsContainer: React.VFC<CommentsContainerProps> = (props) => {
  return (
    <div className="flex flex-col space-y-3">
      <CommentsList comments={props.comments} />
      <CommentAddForm onSubmit={props.onSubmit} />
    </div>
  );
};
