import React from "react";
import { CommentModel } from "../CommentModel";
import { ListItem } from "./item";
import { useTranslation } from "@/i18n";
import classNames from "classnames";

export interface CommentsListProps {
  className?: string;
  comments: Array<CommentModel>;
}

export const CommentsList: React.VFC<CommentsListProps> = ({
  comments,
  className,
}) => {
  const { t } = useTranslation("comments");

  if (!comments.length) {
    return <div className="p-8 text-gray-500">{t("list.empty.text")}</div>;
  }

  const containerClasses = classNames("space-y-4", className);

  return (
    <div className={containerClasses}>
      {comments.map((c) => (
        <ListItem key={c.id} comment={c} />
      ))}
    </div>
  );
};
