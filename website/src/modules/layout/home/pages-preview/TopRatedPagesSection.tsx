import React from 'react';
import { useTranslation } from 'next-i18next';
import { PageModel } from '@disclave/client';
import { useTopRatedPages } from '@/modules/pages';
import { PagesPreviewSection } from './PagesPreviewSection';
import { topRatedPagesHref } from '@/pages/pages/top-rated';

export interface TopRatedPagesSectionProps {
  className?: string;
  pages: Array<PageModel>;
  pagesLimit: number;
  minVoteSum: number;
}

export const TopRatedPagesSection: React.VFC<TopRatedPagesSectionProps> = (props) => {
  const { t } = useTranslation('home');
  const { pages, voteRemove, voteUp, voteDown } = useTopRatedPages(
    props.pages,
    props.minVoteSum,
    props.pagesLimit
  );

  return (
    <PagesPreviewSection
      className={props.className}
      pages={pages}
      header={t('pages rankings.top rated.title')}
      href={topRatedPagesHref()}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
