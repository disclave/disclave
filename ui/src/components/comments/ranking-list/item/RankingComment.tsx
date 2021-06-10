import React, { useEffect, useRef, useState } from "react";
import { CommentActionsHandler, RankingCommentModel, UrlId } from "@/types";
import { useTranslation } from "@/i18n";
import { LinkBox } from "@/components/links";
import {
  CommentContent,
  CommentFooter,
  CommentTimestamp,
} from "@/components/comments/list-item";
import { CommentWebsiteInfo } from "./website";

export interface RankingCommentProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  comment: RankingCommentModel;
  hrefBuilder: (urlId: UrlId, commentId?: string) => string;
}

export const RankingComment: React.VFC<RankingCommentProps> = (props) => {
  const { t } = useTranslation("comments");
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const urlId = {
    websiteId: props.comment.page.websiteId,
    pageId: props.comment.page.pageId,
  };

  useEffect(() => {
    if (!textWrapperRef.current || !textRef.current) return;

    setShowMoreVisible(
      textRef.current.scrollHeight > textWrapperRef.current.offsetHeight
    );
  });

  const detailsHref = props.hrefBuilder(urlId, props.comment.id);

  const ShowMoreText = () => (
    <span className="uppercase text-primary text-xs hover:underline">
      {t("list.item.show all")}
    </span>
  );

  return (
    <LinkBox className="px-2 py-1" href={detailsHref}>
      <CommentWebsiteInfo urlId={urlId} />

      <div className="mb-0.5">
        <span className="font-semibold text-sm">
          {props.comment.author.name}
        </span>
        <CommentTimestamp timestamp={props.comment.timestamp} />
      </div>

      <div ref={textWrapperRef} className="max-h-10 overflow-hidden">
        <CommentContent ref={textRef} text={props.comment.text} />
      </div>

      {showMoreVisible ? <ShowMoreText /> : null}

      <CommentFooter
        actionsHandler={props.actionsHandler}
        authenticated={props.authenticated}
        className="mt-1"
        commentId={props.comment.id}
        votes={props.comment.votes}
      />
    </LinkBox>
  );
};
