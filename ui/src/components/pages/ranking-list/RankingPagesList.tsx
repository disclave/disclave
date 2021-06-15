import React from "react";
import { PageActionsHandler, RankingPageModel } from "@/types";
import { useTranslation } from "@/i18n";
import { RankingPage } from "./item";

export interface RankingPagesListProps {
  actionHandler: PageActionsHandler;
  authenticated: boolean;
  className?: string;
  pages: Array<RankingPageModel>;
  hideDomain: boolean;
  hideLogo: boolean;
  hrefBuilder: (url: string) => string;
}

export const RankingPagesList: React.VFC<RankingPagesListProps> = ({
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
        <RankingPage
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
