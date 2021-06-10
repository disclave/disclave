import React from "react";
import { useTranslation } from "@/i18n";
import { RankingComment } from "./item";
import { CommentActionsHandler, RankingCommentModel, UrlId } from "@/types";

export interface RankingCommentsListProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  className?: string;
  comments: Array<RankingCommentModel>;
  hrefBuilder: (urlId: UrlId, commentId?: string) => string;
}

export const RankingCommentsList: React.VFC<RankingCommentsListProps> = ({
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

  return (
    <div className={className}>
      {comments.map((c) => (
        <RankingComment
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
