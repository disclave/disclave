import * as React from "react";
import { CommentActionsHandler, CommentModel } from "./CommentModel";
import { PageCommentsList } from "./list";
import { CommentAddForm } from "./add";
import { CommentAddAuth } from "./auth";
import { UserProfileModel, UserSelfAvatar } from "@/components/auth";
import classNames from "classnames";

export interface PageCommentsContainerProps {
  className?: string;
  comments: Array<CommentModel>;
  iframe?: boolean;
  inputTop?: boolean;
  loginHref: string;
  userProfile: UserProfileModel | null;
  onSubmit: (text: string) => Promise<void>;
  onLogout: () => Promise<void>;
  commentsActionsHandler: CommentActionsHandler;
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
    props.inputTop ? "order-1" : "sticky bottom-0",
    { "py-2": authenticated }
  );

  const commentsClasses = props.inputTop ? "order-2 pt-2" : "flex-1";

  return (
    <div className={containerClasses}>
      <PageCommentsList
        actionsHandler={props.commentsActionsHandler}
        authenticated={authenticated}
        className={commentsClasses}
        comments={props.comments}
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
            <CommentAddAuth iframe={props.iframe} loginHref={props.loginHref} />
          </div>
        )}
      </div>
    </div>
  );
};
