import React from "react";
import {
  CommentActionsHandler,
  CommentModel,
  CommentUrlMeta,
} from "@/components/comments/CommentModel";
import { useTranslation } from "@/i18n";
import classNames from "classnames";
import { PreviewListItem } from "@/components/comments/list/preview/item";

export interface PreviewCommentsListProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  className?: string;
  comments: Array<CommentModel>;
  hrefBuilder: (urlMeta: CommentUrlMeta, commentId?: string) => string;
}

export const PreviewCommentsList: React.VFC<PreviewCommentsListProps> = ({
  actionsHandler,
  authenticated,
  className,
  comments,
  hrefBuilder,
}) => {
  const { t } = useTranslation("comments");

  if (!comments.length) {
    return <div className="p-8 text-gray-500">{t("list.empty.text")}</div>;
  }

  const containerClasses = classNames("space-y-3", className);

  return (
    <div className={containerClasses}>
      {comments.map((c) => (
        <PreviewListItem
          key={c.id}
          actionsHandler={actionsHandler}
          authenticated={authenticated}
          comment={c}
          hrefBuilder={hrefBuilder}
        />
      ))}
    </div>
  );
};