import * as React from "react";
import { CommentModel } from "./CommentModel";
import { CommentsList } from "./list";
import { CommentAddForm } from "./add";
import { CommentAddAuth } from "./auth";

export interface CommentsContainerProps {
  className?: string;
  comments: Array<CommentModel>;
  authenticated: boolean;
  onSubmit: (text: string) => Promise<void>;
  onLogin: () => Promise<void>;
}

export const CommentsContainer: React.VFC<CommentsContainerProps> = (props) => {
  const containerClasses = [
    "flex flex-col",
    "overflow-auto",
    props.className ?? "",
  ].join(" ");

  const stickyFooterClasses = [
    "sticky bottom-0",
    props.authenticated ? "py-2" : "",
  ].join(" ");

  return (
    <div className={containerClasses}>
      <CommentsList comments={props.comments} />
      <div className={stickyFooterClasses}>
        {props.authenticated ? (
          <CommentAddForm onSubmit={props.onSubmit} />
        ) : (
          <CommentAddAuth onLogin={props.onLogin} />
        )}
      </div>
    </div>
  );
};
