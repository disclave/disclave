import React from 'react';
import { useTranslation } from 'next-i18next';
import { RankingPageModel, UrlId } from '@disclave/client';
import { useTopCommentedPages } from '@/modules/pages';
import { WebsitePagesRankingPreview } from './WebsitePagesRankingPreview';

export interface WebsiteTopCommentedPagesProps {
  className?: string;
  pages: Array<RankingPageModel>;
  pagesLimit: number;
  minCommentsVoteSum: number;
  urlId: UrlId | null;
}

export const WebsiteTopCommentedPages: React.VFC<WebsiteTopCommentedPagesProps> = (props) => {
  const { t } = useTranslation('website');

  const loading = props.urlId == null;

  const { pages, voteRemove, voteUp, voteDown } = useTopCommentedPages(
    props.pages,
    loading,
    props.minCommentsVoteSum,
    props.pagesLimit,
    props.urlId?.websiteId ?? null,
    props.urlId?.pageId ?? null
  );

  return (
    <WebsitePagesRankingPreview
      className={props.className}
      pages={pages}
      header={t('more from.top commented header')}
      loading={loading}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
