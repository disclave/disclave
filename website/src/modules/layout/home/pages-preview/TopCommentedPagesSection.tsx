import React from 'react';
import { useTranslation } from 'next-i18next';
import { PageModel } from '@disclave/client';
import { topCommentedPagesHref } from '@/pages/pages/top-commented';
import { useTopCommentedPages } from '@/modules/pages';
import { PagesPreviewSection } from './PagesPreviewSection';

export interface TopCommentedPagesSectionProps {
  className?: string;
  pages: Array<PageModel>;
  pagesLimit: number;
  minCommentsVoteSum: number;
}

export const TopCommentedPagesSection: React.VFC<TopCommentedPagesSectionProps> = (props) => {
  const { t } = useTranslation('home');
  const { pages, voteRemove, voteUp, voteDown } = useTopCommentedPages(
    props.pages,
    props.minCommentsVoteSum,
    props.pagesLimit
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
