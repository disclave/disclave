import React from 'react';
import { useTranslation } from 'next-i18next';
import { RankingPageModel, UrlId } from '@disclave/client';
import { WebsiteTopCommentedPages, WebsiteTopRatedPages } from './rankings';
import { SkeletonBox } from '@disclave/ui';

export interface MoreFromProps {
  urlId: UrlId | null;
  topCommentedPages: {
    pages: Array<RankingPageModel>;
    limit: number;
    minCommentsVoteSum: number;
  };
  topRatedPages: {
    pages: Array<RankingPageModel>;
    limit: number;
    minPagesVoteSum: number;
    minCommentsVoteSum: number;
  };
}

export const MoreFrom: React.VFC<MoreFromProps> = ({ urlId, topCommentedPages, topRatedPages }) => {
  const { t } = useTranslation('website');

  return (
    <div>
      <h3 className="text-lg pb-2">
        <span className="align-middle">{t('more from.header')} </span>
        {urlId ? (
          <span className="font-semibold align-middle">{urlId?.websiteId}</span>
        ) : (
          <SkeletonBox className="w-36 h-5 inline-block align-middle" />
        )}
      </h3>

      <WebsiteTopCommentedPages
        pages={topCommentedPages.pages}
        pagesLimit={topCommentedPages.limit}
        minCommentsVoteSum={topCommentedPages.minCommentsVoteSum}
        urlId={urlId}
      />

      <WebsiteTopRatedPages
        pages={topRatedPages.pages}
        pagesLimit={topRatedPages.limit}
        minCommentsVoteSum={topRatedPages.minCommentsVoteSum}
        minPagesVoteSum={topRatedPages.minPagesVoteSum}
        urlId={urlId}
      />
    </div>
  );
};
