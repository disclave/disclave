import * as React from "react";
import { CommentModel } from "./CommentModel";
import { CommentsList } from "./list";
import { CommentAddForm } from "./add";
import { CommentAddAuth } from "./auth";
import { UserSelfAvatar } from "@/components/auth";
import { UserProfileModel } from "../auth/UserProfileModel";

export interface CommentsContainerProps {
  className?: string;
  comments: Array<CommentModel>;
  iframe?: boolean;
  loginHref: string;
  registerHref: string;
  userProfile?: UserProfileModel;
  onSubmit: (text: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

export const CommentsContainer: React.VFC<CommentsContainerProps> = (props) => {
  const containerClasses = [
    "flex flex-col",
    "overflow-auto",
    props.className ?? "",
  ].join(" ");

  const stickyFooterClasses = [
    "sticky bottom-0",
    props.userProfile ? "py-2" : "",
  ].join(" ");

  return (
    <div className={containerClasses}>
      <CommentsList comments={props.comments} />
      <div className={stickyFooterClasses}>
        {props.userProfile ? (
          <div className="flex flex-row items-center space-x-2">
            <UserSelfAvatar
              userProfile={props.userProfile}
              top
              onLogout={props.onLogout}
            />
            <CommentAddForm onSubmit={props.onSubmit} className="flex-grow" />
          </div>
        ) : (
          <CommentAddAuth
            iframe={props.iframe}
            loginHref={props.loginHref}
            registerHref={props.registerHref}
          />
        )}
      </div>
    </div>
  );
};
