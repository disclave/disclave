import React from 'react';
import { useTranslation } from 'next-i18next';
import { RankingPageModel, UrlId } from '@disclave/client';
import { useTopCommentedPages } from '@/modules/pages';
import { WebsitePagesRankingPreview } from './WebsitePagesRankingPreview';
import { topRatedPagesHref } from '@/pages/pages/top-rated';

export interface WebsiteTopCommentedPagesProps {
  className?: string;
  pages: Array<RankingPageModel>;
  pagesLimit: number;
  minCommentsVoteSum: number;
  urlId: UrlId;
}

export const WebsiteTopCommentedPages: React.VFC<WebsiteTopCommentedPagesProps> = (props) => {
  const { t } = useTranslation('website');
  const { pages, voteRemove, voteUp, voteDown } = useTopCommentedPages(
    props.pages,
    props.minCommentsVoteSum,
    props.pagesLimit,
    props.urlId.websiteId,
    props.urlId.pageId
  );

  return (
    <WebsitePagesRankingPreview
      className={props.className}
      pages={pages}
      header={t('more from.top commented header')}
      href={topRatedPagesHref()}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
