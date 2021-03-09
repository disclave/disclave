import * as React from "react";
import { CommentModel } from "./CommentModel";
import { CommentsList } from "./list";
import { CommentAddForm } from "./add/CommentAddForm";

export interface CommentsContainerProps {
  comments: CommentModel[];
  onSubmit: (text: string) => Promise<void>;
}

export const CommentsContainer: React.VFC<CommentsContainerProps> = (props) => {
  return (
    <div>
      <CommentsList comments={props.comments} />
      <CommentAddForm onSubmit={props.onSubmit} />
    </div>
  );
};
