import React from "react";
import { PageModel } from "@/components/pages/PageModel";
import { useTranslation } from "@/i18n";
import { ListItem } from "./item";

export interface PagesListProps {
  className?: string;
  pages: Array<PageModel>;
  hrefBuilder: (websiteId: string, pageId: string) => string;
}

export const PagesList: React.VFC<PagesListProps> = ({
  className,
  pages,
  hrefBuilder,
}) => {
  const { t } = useTranslation("pages");

  if (!pages.length) {
    return <div className="p-4 text-gray-500">{t("list.empty.text")}</div>;
  }

  return (
    <div className={className}>
      {pages.map((p) => (
        <ListItem key={p.id} page={p} hrefBuilder={hrefBuilder} />
      ))}
    </div>
  );
};