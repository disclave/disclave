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

  const href = hrefBuilder(page.websiteId, page.pageId);

  return (
    <LinkBox href={href}>
      <div className="text-sm font-semibold truncate">{page.websiteId}</div>
      <div className="truncate mb-0.5">{decodeURIComponent(page.pageId)}</div>
      <div>
        <span className="font-bold text-primary">{page.commentsCount}</span>
        <span> {t("list.item.comments count.text")}</span>
      </div>
    </LinkBox>
  );
};
