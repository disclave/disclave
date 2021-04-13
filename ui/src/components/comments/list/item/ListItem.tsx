import React, { useEffect, useRef, useState } from "react";
import { CommentModel, CommentUrlMeta } from "../../CommentModel";
import { DateTimePreview } from "@/components/date/dateTimePreview";
import { CommentVote } from "@/components/comments/list/item/vote";
import { CommentWebsiteInfo } from "@/components/comments/list/item/website";
import classNames from "classnames";
import { getAnchorWrapper } from "@/config";
import { useTranslation } from "@/i18n";

export interface ListItemProps {
  comment: CommentModel;
  authenticated: boolean;
  hrefBuilder?: (urlMeta: CommentUrlMeta, commentId?: string) => string;
  preview: boolean;
  showWebsite: boolean;
  onVoteUp: (commentId: string) => Promise<void>;
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
}

export const ListItem: React.VFC<ListItemProps> = (props) => {
  const { t } = useTranslation("comments");
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const detailsHref = props.hrefBuilder
    ? props.hrefBuilder(props.comment.urlMeta, props.comment.id)
    : undefined;

  const AnchorTag = getAnchorWrapper() ?? "a";

  const textWrapperClassNames = classNames({
    "max-h-10 overflow-hidden": props.preview,
  });

  useEffect(() => {
    if (!textWrapperRef.current || !textRef.current) return;

    setShowMoreVisible(
      textRef.current.scrollHeight > textWrapperRef.current.offsetHeight
    );
  });

  const DateTime = () => (
    <span className="ml-2 font-light text-xs">
      <DateTimePreview iso={props.comment.timestamp} />
    </span>
  );
  const DateTimeLink = ({ href }: { href: string }) => (
    <AnchorTag className="hover:underline" href={href}>
      <DateTime />
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
      {props.showWebsite && props.hrefBuilder ? (
        <CommentWebsiteInfo
          className="mb-1"
          urlMeta={props.comment.urlMeta}
          hrefBuilder={props.hrefBuilder}
        />
      ) : null}

      <div>
        <span className="font-semibold text-sm">
          {props.comment.author.name}
        </span>
        {detailsHref ? <DateTimeLink href={detailsHref} /> : <DateTime />}
      </div>

      <div className="mt-1 mb-2">
        <div ref={textWrapperRef} className={textWrapperClassNames}>
          <p
            ref={textRef}
            className="text-sm whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: props.comment.text }}
          />
        </div>

        {showMoreVisible && detailsHref ? (
          <ShowMoreLink href={detailsHref} />
        ) : null}
      </div>

      <div>
        <CommentVote
          commentId={props.comment.id}
          enabled={props.authenticated}
          votes={props.comment.votes}
          onVoteUp={props.onVoteUp}
          onVoteDown={props.onVoteDown}
          onVoteRemove={props.onVoteRemove}
        />
      </div>
    </div>
  );
};
