import React from "react";
import { PageActionsHandler, RankingPageModel } from "@/types";
import { useTranslation } from "@/i18n";
import { RankingPage } from "./item";
import { RankingPageSkeleton } from "./item/skeleton";

export interface RankingPagesListProps {
  actionHandler: PageActionsHandler;
  authenticated: boolean;
  className?: string;
  pages: Array<RankingPageModel>;
  hideDomain: boolean;
  hideLogo: boolean;
  hrefBuilder: (url: string) => string;
  loading: boolean;
}

export const RankingPagesList: React.VFC<RankingPagesListProps> = ({
  actionHandler,
  authenticated,
  className,
  hideDomain,
  hideLogo,
  pages,
  hrefBuilder,
  loading,
}) => {
  const { t } = useTranslation("pages");

  if (loading) {
    return (
      <div className={className}>
        <div className="flex flex-col space-y-4">
          <RankingPageSkeleton />
          <RankingPageSkeleton />
          <RankingPageSkeleton />
        </div>
      </div>
    );
  }

  if (!pages.length) {
    return (
      <div className={className}>
        <div className="p-4 text-gray-500">{t("list.empty.text")}</div>
      </div>
    );
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
