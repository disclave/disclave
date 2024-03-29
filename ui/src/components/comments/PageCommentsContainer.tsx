import React from "react";
import { PageCommentsList } from "./page-list";
import { CommentAddForm } from "./add";
import { CommentAddAuth } from "./auth";
import { UserProfileModel, UserSelfAvatar } from "@/components/auth";
import classNames from "classnames";
import { CommentActionsHandler, PageCommentModel } from "@/types";

export interface PageCommentsContainerProps {
  className?: string;
  comments: Array<PageCommentModel>;
  iframe?: boolean;
  inputTop?: boolean;
  loginHref: string;
  registerHref: string;
  userProfile: UserProfileModel | null;
  onSubmit: (text: string) => Promise<void>;
  onLogout: () => Promise<void>;
  commentsActionsHandler: CommentActionsHandler;
  loading: boolean;
}

export const PageCommentsContainer: React.VFC<PageCommentsContainerProps> = (
  props
) => {
  const authenticated = !!props.userProfile;

  const containerClasses = classNames(
    "flex flex-col overflow-auto py-1",
    props.className
  );

  const stickyFooterClasses = classNames(
    "z-30",
    props.inputTop ? "order-1" : "sticky bottom-0",
    { "py-2": authenticated }
  );

  const commentsClasses = classNames(
    "z-20",
    props.inputTop ? "order-2 pt-2" : "flex-1"
  );

  return (
    <div className={containerClasses}>
      <PageCommentsList
        actionsHandler={props.commentsActionsHandler}
        authenticated={authenticated}
        className={commentsClasses}
        comments={props.comments}
        loading={props.loading}
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
