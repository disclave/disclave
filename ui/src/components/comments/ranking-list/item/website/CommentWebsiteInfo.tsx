import React from "react";
import classNames from "classnames";
import { UrlId } from "@/types";

export interface CommentWebsiteInfoProps {
  className?: string;
  urlId: UrlId;
}

export const CommentWebsiteInfo: React.VFC<CommentWebsiteInfoProps> = ({
  className,
  urlId,
}) => {
  const wrapperClassName = classNames(
    "text-sm truncate hover:underline",
    className
  );
  const decodedPageId = decodeURIComponent(urlId.pageId);

  return (
    <div className={wrapperClassName} title={urlId.websiteId + decodedPageId}>
      <span className="font-bold">{urlId.websiteId}</span>
      <span className="font-semibold">{decodedPageId}</span>
    </div>
  );
};
