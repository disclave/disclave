import React from "react";
import { CommentUrlMeta } from "../../../CommentModel";
import classNames from "classnames";

export interface CommentWebsiteInfoProps {
  className?: string;
  urlMeta: CommentUrlMeta;
}

export const CommentWebsiteInfo: React.VFC<CommentWebsiteInfoProps> = ({
  className,
  urlMeta,
}) => {
  const wrapperClassName = classNames("text-xs truncate", className);
  const decodedPageId = decodeURIComponent(urlMeta.pageId);

  return (
    <div className={wrapperClassName}>
      <span className="font-bold">{urlMeta.websiteId}</span>
      <span className="font-semibold">{decodedPageId}</span>
    </div>
  );
};
