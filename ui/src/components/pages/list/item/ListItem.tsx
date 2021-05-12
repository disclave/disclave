import React from "react";
import { PageModel } from "@/components/pages/PageModel";
import { useTranslation } from "@/i18n";

export interface ListItemProps {
  page: PageModel;
}

export const ListItem: React.VFC<ListItemProps> = ({ page }) => {
  const { t } = useTranslation("pages");

  return (
    <div>
      <div className="text-sm font-semibold truncate">{page.websiteId}</div>
      <div className="truncate mb-0.5">{decodeURIComponent(page.pageId)}</div>
      <div>
        <span className="font-bold text-primary">{page.commentsCount}</span>
        <span> {t('list.item.comments count.text')}</span>
      </div>
    </div>
  );
};
