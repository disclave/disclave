import React, { useEffect, useRef, useState } from "react";
import {
  CommentActionsHandler,
  CommentModel,
  CommentUrlMeta,
} from "@/components/comments/CommentModel";
import { DateTimePreview } from "@/components/date/dateTimePreview";
import { CommentWebsiteInfo } from "@/components/comments/list/item/website";
import { getAnchorWrapper } from "@/config";
import { useTranslation } from "@/i18n";
import {
  ListItemContent,
  ListItemFooter,
} from "@/components/comments/list/item";

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

  const DateTimeLink = () => (
    <AnchorTag className="hover:underline" href={detailsHref}>
      <DateTimePreview
        className="ml-2 font-light text-xs"
        iso={props.comment.timestamp}
      />
    </AnchorTag>
  );

  const ShowMoreLink = () => (
    <AnchorTag
      href={detailsHref}
      className="uppercase text-primary text-xs hover:underline"
    >
      {t("list.item.show all")}
    </AnchorTag>
  );

  return (
    <div>
      <CommentWebsiteInfo
        urlMeta={props.comment.urlMeta}
        hrefBuilder={props.hrefBuilder}
      />

      <div className="mb-0.5">
        <span className="font-semibold text-sm">
          {props.comment.author.name}
        </span>
        <DateTimeLink />
      </div>

      <div ref={textWrapperRef} className="max-h-10 overflow-hidden">
        <AnchorTag href={detailsHref}>
          <ListItemContent ref={textRef} comment={props.comment} />
        </AnchorTag>
      </div>

      {showMoreVisible ? <ShowMoreLink /> : null}

      <ListItemFooter
        actionsHandler={props.actionsHandler}
        authenticated={props.authenticated}
        className="mt-1"
        comment={props.comment}
      />
    </div>
  );
};
