import React from "react";
import { CommentUrlMeta } from "@/types/PageCommentModel";
import classNames from "classnames";

export interface CommentWebsiteInfoProps {
  className?: string;
  urlMeta: CommentUrlMeta;
}

export const CommentWebsiteInfo: React.VFC<CommentWebsiteInfoProps> = ({
  className,
  urlMeta,
}) => {
  const wrapperClassName = classNames(
    "text-sm truncate hover:underline",
    className
  );
  const decodedPageId = decodeURIComponent(urlMeta.pageId);

  return (
    <div className={wrapperClassName} title={urlMeta.websiteId + decodedPageId}>
      <span className="font-bold">{urlMeta.websiteId}</span>
      <span className="font-semibold">{decodedPageId}</span>
    </div>
  );
};
