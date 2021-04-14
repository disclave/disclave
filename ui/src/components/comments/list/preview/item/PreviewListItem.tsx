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
import { ListItemFooter } from "@/components/comments/list/item";

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

  const detailsHref = props.hrefBuilder(
    props.comment.urlMeta,
    props.comment.id
  );

  const AnchorTag = getAnchorWrapper() ?? "a";

  useEffect(() => {
    if (!textWrapperRef.current || !textRef.current) return;

    setShowMoreVisible(
      textRef.current.scrollHeight > textWrapperRef.current.offsetHeight
    );
  });

  const DateTimeLink = ({ href }: { href: string }) => (
    <AnchorTag className="hover:underline" href={href}>
      <DateTimePreview
        className="ml-2 font-light text-xs"
        iso={props.comment.timestamp}
      />
    </AnchorTag>
  );

  const ShowMoreLink = ({ href }: { href: string }) => (
    <AnchorTag
      href={href}
      className="uppercase text-primary text-xs hover:underline"
    >
      {t("list.item.show all")}
    </AnchorTag>
  );

  return (
    <div>
      <CommentWebsiteInfo
        className="mb-1"
        urlMeta={props.comment.urlMeta}
        hrefBuilder={props.hrefBuilder}
      />

      <div className="mb-0.5">
        <span className="font-semibold text-sm">
          {props.comment.author.name}
        </span>
        <DateTimeLink href={detailsHref} />
      </div>

      <div>
        <div
          ref={textWrapperRef}
          id={props.comment.id}
          className="max-h-10 overflow-hidden pt-32 -mt-32"
        >
          <p
            ref={textRef}
            className="text-sm whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: props.comment.text.trim() }}
          />
        </div>

        {showMoreVisible ? <ShowMoreLink href={detailsHref} /> : null}
      </div>

      <ListItemFooter
        actionsHandler={props.actionsHandler}
        authenticated={props.authenticated}
        className="mt-1"
        comment={props.comment}
      />
    </div>
  );
};
