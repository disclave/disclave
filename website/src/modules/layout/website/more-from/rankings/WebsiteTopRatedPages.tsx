import React from 'react';
import { useTranslation } from 'next-i18next';
import { RankingPageModel, UrlId } from '@disclave/client';
import { useTopRatedPages } from '@/modules/pages';
import { WebsitePagesRankingPreview } from './WebsitePagesRankingPreview';

export interface WebsiteTopRatedPagesProps {
  className?: string;
  pages: Array<RankingPageModel>;
  pagesLimit: number;
  minPagesVoteSum: number;
  minCommentsVoteSum: number;
  urlId: UrlId | null;
}

export const WebsiteTopRatedPages: React.VFC<WebsiteTopRatedPagesProps> = (props) => {
  const { t } = useTranslation('website');

  const loading = props.urlId == null;

  const { pages, voteRemove, voteUp, voteDown } = useTopRatedPages(
    props.pages,
    loading,
    props.minPagesVoteSum,
    props.minCommentsVoteSum,
    props.pagesLimit,
    props.urlId?.websiteId ?? null,
    props.urlId?.pageId ?? null
  );

  return (
    <WebsitePagesRankingPreview
      className={props.className}
      pages={pages}
      header={t('more from.top rated header')}
      loading={loading}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
