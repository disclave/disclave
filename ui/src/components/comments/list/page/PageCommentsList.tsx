import React from "react";
import {
  CommentActionsHandler,
  CommentModel,
} from "@/types/PageCommentModel";
import { useTranslation } from "@/i18n";
import { PageListItem } from "@/components/comments/list/page/item";
import { PageListItemSkeleton } from "./item/skeleton/PageListItemSkeleton";

export interface PageCommentsListProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  className?: string;
  comments: Array<CommentModel>;
  loading: boolean;
}

export const PageCommentsList: React.VFC<PageCommentsListProps> = ({
  actionsHandler,
  authenticated,
  className,
  comments,
  loading,
}) => {
  const { t } = useTranslation("comments");

  if (loading) {
    return (
      <div className={className}>
        <div className="flex flex-col space-y-4">
          <PageListItemSkeleton />
          <PageListItemSkeleton />
          <PageListItemSkeleton />
          <PageListItemSkeleton />
        </div>
      </div>
    );
  }

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
