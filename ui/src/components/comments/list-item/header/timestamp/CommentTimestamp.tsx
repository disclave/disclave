import React from "react";
import { getAnchorWrapper } from "@/config";
import { DateTimePreview } from "@/components/date/dateTimePreview";
import classNames from "classnames";

export interface CommentTimestampProps {
  className?: string;
  href?: string;
  timestamp: string;
}

export const CommentTimestamp: React.VFC<CommentTimestampProps> = ({
  className,
  href,
  timestamp,
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
    <DateTimePreview className={dateTimeClassName} iso={timestamp} />
  );

  if (!href) return <Timestamp />;

  return (
    <AnchorTag href={href}>
      <Timestamp />
    </AnchorTag>
  );
};
