import React from "react";
import {
  CommentActionsHandler,
  CommentModel,
} from "@/components/comments/CommentModel";
import { useTranslation } from "@/i18n";
import classNames from "classnames";
import { PageListItem } from "@/components/comments/list/page/item";

export interface PageCommentsListProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  className?: string;
  comments: Array<CommentModel>;
}

export const PageCommentsList: React.VFC<PageCommentsListProps> = ({
  actionsHandler,
  authenticated,
  className,
  comments,
}) => {
  const { t } = useTranslation("comments");

  if (!comments.length) {
    return <div className="p-8 text-gray-500">{t("list.empty.text")}</div>;
  }

  const containerClasses = classNames("space-y-3", className);

  return (
    <div className={containerClasses}>
      {comments.map((c) => (
        <PageListItem
          key={c.id}
          actionsHandler={actionsHandler}
          authenticated={authenticated}
          comment={c}
        />
      ))}
    </div>
  );
};
