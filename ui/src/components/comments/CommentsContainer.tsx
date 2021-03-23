import * as React from "react";
import { CommentModel } from "./CommentModel";
import { CommentsList } from "./list";
import { CommentAddForm } from "./add";
import { CommentAddAuth } from "./auth";

export interface CommentsContainerProps {
  authenticated: boolean;
  className?: string;
  comments: Array<CommentModel>;
  loginHref: string;
  registerHref: string;
  onSubmit: (text: string) => Promise<void>;
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
          <CommentAddAuth
            loginHref={props.loginHref}
            registerHref={props.registerHref}
          />
        )}
      </div>
    </div>
  );
};
