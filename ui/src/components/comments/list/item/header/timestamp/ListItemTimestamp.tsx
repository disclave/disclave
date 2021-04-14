import React from "react";
import { CommentModel } from "@/components/comments/CommentModel";
import { getAnchorWrapper } from "@/config";
import { DateTimePreview } from "@/components/date/dateTimePreview";
import classNames from "classnames";

export interface ListItemTimestampProps {
  className?: string;
  comment: CommentModel;
  href?: string;
}

export const ListItemTimestamp: React.VFC<ListItemTimestampProps> = ({
  className,
  comment,
  href,
}) => {
  const AnchorTag = getAnchorWrapper() ?? "a";
  const dateTimeClassName = classNames(
    "ml-2 font-light text-xs",
    {
      "hover:underline": href,
    },
    className
  );

  const Timestamp = () => (
    <DateTimePreview className={dateTimeClassName} iso={comment.timestamp} />
  );

  if (!href) return <Timestamp />;

  return (
    <AnchorTag href={href}>
      <Timestamp />
    </AnchorTag>
  );
};
