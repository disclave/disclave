import React, { useEffect, useRef, useState } from "react";
import {
  CommentActionsHandler,
  CommentModel,
  CommentUrlMeta,
} from "@/components/comments/CommentModel";
import { getAnchorWrapper } from "@/config";
import { useTranslation } from "@/i18n";
import {
  CommentWebsiteInfo,
  ListItemContent,
  ListItemFooter,
  ListItemTimestamp,
} from "@/components/comments/list/item";
import { LinkBox } from "@/components/links";

export interface PreviewListItemProps {
  actionsHandler: CommentActionsHandler;
  authenticated: boolean;
  comment: CommentModel;
  hrefBuilder: (urlMeta: CommentUrlMeta, commentId?: string) => string;
}

export const PreviewListItem: React.VFC<PreviewListItemProps> = (props) => {
  const { t } = useTranslation("comments");
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textWrapperRef.current || !textRef.current) return;

    setShowMoreVisible(
      textRef.current.scrollHeight > textWrapperRef.current.offsetHeight
    );
  });

  const detailsHref = props.hrefBuilder(
    props.comment.urlMeta,
    props.comment.id
  );

  const AnchorTag = getAnchorWrapper() ?? "a";

  const ShowMoreLink = () => (
    <AnchorTag
      href={detailsHref}
      className="uppercase text-primary text-xs hover:underline"
    >
      {t("list.item.show all")}
    </AnchorTag>
  );

  return (
    <LinkBox href={detailsHref}>
      <CommentWebsiteInfo
        urlMeta={props.comment.urlMeta}
        hrefBuilder={props.hrefBuilder}
      />

      <div className="mb-0.5">
        <span className="font-semibold text-sm">
          {props.comment.author.name}
        </span>
        <ListItemTimestamp comment={props.comment} href={detailsHref} />
      </div>

      <div ref={textWrapperRef} className="max-h-10 overflow-hidden">
        <ListItemContent ref={textRef} comment={props.comment} />
      </div>

      {showMoreVisible ? <ShowMoreLink /> : null}

      <ListItemFooter
        actionsHandler={props.actionsHandler}
        authenticated={props.authenticated}
        className="mt-1"
        comment={props.comment}
      />
    </LinkBox>
  );
};
