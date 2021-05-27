import React from "react";
import { PageActionsHandler, PageModel } from "@/components/pages/PageModel";
import { useTranslation } from "@/i18n";
import { LinkBox } from "@/components/links";
import { Vote } from "@/components/voting";

export interface ListItemProps {
  actionHandler: PageActionsHandler;
  authenticated: boolean;
  hrefBuilder: (url: string) => string;
  page: PageModel;
}

export const ListItem: React.VFC<ListItemProps> = ({
  actionHandler,
  authenticated,
  page,
  hrefBuilder,
}) => {
  const { t } = useTranslation("pages");

  const logo = page.meta?.logo ?? null;
  const title = page.meta?.title ?? null;

  const decodedPath = decodeURIComponent(page.pageId);

  const onVoteDown = async () => {
    await actionHandler.onVoteDown(page.url);
  };

  const onVoteUp = async () => {
    await actionHandler.onVoteUp(page.url);
  };

  const onVoteRemove = async () => {
    await actionHandler.onVoteRemove(page.url);
  };

  return (
    <LinkBox className="px-2 py-1" href={hrefBuilder(page.url)}>
      <div className="text-sm truncate" title={page.url}>
        {logo ? (
          <img
            src={logo}
            alt={page.websiteId}
            width={16}
            height={16}
            className="mr-1 inline"
          />
        ) : null}
        <span className="font-semibold ">{page.websiteId}</span>
        <span>{decodedPath}</span>
      </div>
      {title ? (
        <div className="truncate" title={title}>
          {title}
        </div>
      ) : null}
      <div className="flex flex-row items-center mt-0.5">
        <Vote
          enabled={authenticated}
          votes={{
            sum: page.votes.sum,
            votedDown: page.votes.votedDown,
            votedUp: page.votes.votedUp,
          }}
          vertical={false}
          onVoteDown={onVoteDown}
          onVoteRemove={onVoteRemove}
          onVoteUp={onVoteUp}
        />
        <div className="ml-4 pb-1">
          <span className="font-bold text-primary">{page.commentsCount}</span>
          <span> {t("list.item.comments count.text")}</span>
        </div>
      </div>
    </LinkBox>
  );
};
