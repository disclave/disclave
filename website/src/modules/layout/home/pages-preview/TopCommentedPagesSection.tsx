import React from 'react';
import { useTranslation } from 'next-i18next';
import { RankingPageModel } from '@disclave/client';
import { topCommentedPagesHref } from '@/pages/pages/top-commented';
import { useTopCommentedPages } from '@/modules/pages';
import { PagesPreviewSection } from './PagesPreviewSection';

export interface TopCommentedPagesSectionProps {
  className?: string;
  pages: Array<RankingPageModel>;
  pagesLimit: number;
  minCommentsVoteSum: number;
}

export const TopCommentedPagesSection: React.VFC<TopCommentedPagesSectionProps> = (props) => {
  const { t } = useTranslation('home');
  const { pages, voteRemove, voteUp, voteDown } = useTopCommentedPages(
    props.pages,
    false,
    props.minCommentsVoteSum,
    props.pagesLimit,
    null,
    null
  );

  return (
    <PagesPreviewSection
      className={props.className}
      pages={pages}
      header={t('pages rankings.top commented.title')}
      href={topCommentedPagesHref()}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
