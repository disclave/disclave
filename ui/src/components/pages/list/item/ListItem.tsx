import React from "react";
import { PageModel } from "@/components/pages/PageModel";
import { useTranslation } from "@/i18n";
import { LinkBox } from "@/components/links";

export interface ListItemProps {
  hrefBuilder: (websiteId: string, pageId: string) => string;
  page: PageModel;
}

export const ListItem: React.VFC<ListItemProps> = ({ page, hrefBuilder }) => {
  const { t } = useTranslation("pages");

  const logo = page.meta?.logo ?? null;
  const title = page.meta?.title ?? null;

  const decodedPath = decodeURIComponent(page.pageId);

  return (
    <LinkBox className="px-2 py-1" href={page.url}>
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
      {title ? <div className="truncate" title={title}>{title}</div> : null}
      <div>
        <span className="font-bold text-primary">{page.commentsCount}</span>
        <span> {t("list.item.comments count.text")}</span>
      </div>
    </LinkBox>
  );
};
