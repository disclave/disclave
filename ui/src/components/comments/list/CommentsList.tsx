import React from "react";
import { CommentModel } from "../CommentModel";
import { ListItem } from "./item";
import { useTranslation } from "@/i18n";
import classNames from "classnames";

export interface CommentsListProps {
  authenticated: boolean;
  className?: string;
  comments: Array<CommentModel>;
  onVoteUp: (commentId: string) => Promise<void>;
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
}

export const CommentsList: React.VFC<CommentsListProps> = ({
  authenticated,
  comments,
  className,
  onVoteUp,
  onVoteDown,
  onVoteRemove,
}) => {
  const { t } = useTranslation("comments");

  if (!comments.length) {
    return <div className="p-8 text-gray-500">{t("list.empty.text")}</div>;
  }

  const containerClasses = classNames("space-y-3", className);

  return (
    <div className={containerClasses}>
      {comments.map((c) => (
        <ListItem
          key={c.id}
          comment={c}
          authenticated={authenticated}
          onVoteDown={onVoteDown}
          onVoteRemove={onVoteRemove}
          onVoteUp={onVoteUp}
        />
      ))}
    </div>
  );
};
