import React from "react";
import classNames from "classnames";
import { RankingCommentPageModel } from "@/types";

export interface CommentPageInfoProps {
  className?: string;
  page: RankingCommentPageModel;
}

export const CommentPageInfo: React.VFC<CommentPageInfoProps> = ({
  className,
  page,
}) => {
  const wrapperClassName = classNames(
    "text-sm hover:underline flex flex-row items-center",
    className
  );
  const decodedPageId = decodeURIComponent(page.pageId);

  const logo = page.meta?.logo ?? null;
  const title = page.meta?.title ?? null;

  return (
    <div className={wrapperClassName} title={page.websiteId + decodedPageId}>
      {logo ? (
        <img src={logo} className="flex-shrink-0 mr-1" height={16} width={16} />
      ) : null}
      <div className="truncate">
        {title ? <span className="text-sm">{title} | </span> : null}
        <span className="font-bold">{page.websiteId}</span>
        <span className="font-semibold">{decodedPageId}</span>
      </div>
    </div>
  );
};
