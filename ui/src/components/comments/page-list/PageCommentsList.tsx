import React from "react";
import { CommentActionsHandler, PageCommentModel } from "@/types";
import { useTranslation } from "@/i18n";
import { PageComment } from "./item";
import { PageCommentSkeleton } from "./item/skeleton";

export interface PageCommentsListProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  className?: string;
  comments: Array<PageCommentModel>;
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
          <PageCommentSkeleton />
          <PageCommentSkeleton />
          <PageCommentSkeleton />
          <PageCommentSkeleton />
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
        <PageComment
          key={c.id}
          actionsHandler={actionsHandler}
          authenticated={authenticated}
          comment={c}
        />
      ))}
    </div>
  );
};
