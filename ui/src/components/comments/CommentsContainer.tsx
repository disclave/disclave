import * as React from "react";
import { CommentModel } from "./CommentModel";
import { CommentsList } from "./list";
import { CommentAddForm } from "./add";
import { CommentAddAuth } from "./auth";
import { UserSelfAvatar } from "@/components/auth";
import { UserProfileModel } from "../auth/UserProfileModel";
import classNames from "classnames";

export interface CommentsContainerProps {
  className?: string;
  comments: Array<CommentModel>;
  iframe?: boolean;
  inputTop?: boolean;
  loginHref: string;
  registerHref: string;
  userProfile?: UserProfileModel;
  onSubmit: (text: string) => Promise<void>;
  onLogout: () => Promise<void>;
  onVoteUp: (commentId: string) => Promise<void>;
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
}

export const CommentsContainer: React.VFC<CommentsContainerProps> = (props) => {
  const authenticated = !!props.userProfile;

  const containerClasses = classNames(
    "flex flex-col overflow-auto",
    props.className
  );

  const stickyFooterClasses = classNames(
    props.inputTop ? "order-1" : "sticky bottom-0",
    { "py-2": authenticated }
  );

  const commentsClasses = props.inputTop ? "order-2 pt-2" : "flex-1";

  return (
    <div className={containerClasses}>
      <CommentsList
        authenticated={authenticated}
        comments={props.comments}
        className={commentsClasses}
        onVoteRemove={props.onVoteRemove}
        onVoteDown={props.onVoteDown}
        onVoteUp={props.onVoteUp}
      />
      <div className={stickyFooterClasses}>
        {props.userProfile ? (
          <div className="flex flex-row items-center space-x-2">
            <UserSelfAvatar
              userProfile={props.userProfile}
              top={!props.inputTop}
              onLogout={props.onLogout}
            />
            <CommentAddForm onSubmit={props.onSubmit} className="flex-grow" />
          </div>
        ) : (
          <div>
            <CommentAddAuth
              iframe={props.iframe}
              loginHref={props.loginHref}
              registerHref={props.registerHref}
            />
          </div>
        )}
      </div>
    </div>
  );
};
