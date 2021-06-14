import React from "react";
import { PageActionsHandler, PageModel } from "@/components/pages/PageModel";
import { useTranslation } from "@/i18n";
import { ListItem } from "./item";

export interface PagesListProps {
  actionHandler: PageActionsHandler;
  authenticated: boolean;
  className?: string;
  pages: Array<PageModel>;
  hideDomain: boolean;
  hideLogo: boolean;
  hrefBuilder: (url: string) => string;
}

export const PagesList: React.VFC<PagesListProps> = ({
  actionHandler,
  authenticated,
  className,
  hideDomain,
  hideLogo,
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
        <ListItem
          key={p.id}
          page={p}
          actionHandler={actionHandler}
          authenticated={authenticated}
          hideDomain={hideDomain}
          hideLogo={hideLogo}
          hrefBuilder={hrefBuilder}
        />
      ))}
    </div>
  );
};
