import React from "react";
import { CommentModel, CommentUrlMeta } from "../CommentModel";
import { ListItem } from "./item";
import { useTranslation } from "@/i18n";
import classNames from "classnames";

export interface CommentsListProps {
  authenticated: boolean;
  className?: string;
  comments: Array<CommentModel>;
  hrefBuilder?: (urlMeta: CommentUrlMeta, commentId?: string) => string;
  preview: boolean;
  showWebsite: boolean;
  onVoteUp: (commentId: string) => Promise<void>;
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
}

export const CommentsList: React.VFC<CommentsListProps> = ({
  authenticated,
  comments,
  className,
  hrefBuilder,
  preview,
  showWebsite,
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
          hrefBuilder={hrefBuilder}
          authenticated={authenticated}
          preview={preview}
          showWebsite={showWebsite}
          onVoteDown={onVoteDown}
          onVoteRemove={onVoteRemove}
          onVoteUp={onVoteUp}
        />
      ))}
    </div>
  );
};
