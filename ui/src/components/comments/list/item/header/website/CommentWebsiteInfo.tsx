import React from "react";
import { CommentUrlMeta } from "@/components/comments/CommentModel";
import classNames from "classnames";
import { getAnchorWrapper } from "@/config";

export interface CommentWebsiteInfoProps {
  className?: string;
  hrefBuilder: (urlMeta: CommentUrlMeta) => string;
  urlMeta: CommentUrlMeta;
}

export const CommentWebsiteInfo: React.VFC<CommentWebsiteInfoProps> = ({
  className,
  hrefBuilder,
  urlMeta,
}) => {
  const wrapperClassName = classNames("text-sm truncate", className);
  const decodedPageId = decodeURIComponent(urlMeta.pageId);

  const href = hrefBuilder(urlMeta);

  const AnchorTag = getAnchorWrapper() ?? "a";

  return (
    <div className={wrapperClassName} title={urlMeta.websiteId + decodedPageId}>
      <AnchorTag href={href} className={"hover:underline"}>
        <span className="font-bold">{urlMeta.websiteId}</span>
        <span className="font-semibold">{decodedPageId}</span>
      </AnchorTag>
    </div>
  );
};
