import React from "react";
import {
  CommentActionsHandler,
  CommentModel,
} from "@/components/comments/CommentModel";
import { useTranslation } from "@/i18n";
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
    return (
      <div className={className}>
        <div className="p-8 text-gray-500">{t("list.empty.text")}</div>
      </div>
    );
  }

  return (
    <div className={className}>
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
