import React from 'react';
import { useTranslation } from 'next-i18next';
import { PageModel, useSession } from '@disclave/client';
import { Button, PagesList } from '@disclave/ui';
import { websiteHref } from '@/pages/website/[website]';
import { SectionHeader } from '../components';
import { topCommentedPagesHref } from '@/pages/pages/top-commented';
import { useTopCommentedPages } from '@/modules/pages';

export interface TopCommentedPagesSectionProps {
  className?: string;
  pages: Array<PageModel>;
  pagesLimit: number;
  minCommentsVoteSum: number;
}

export const TopCommentedPagesSection: React.VFC<TopCommentedPagesSectionProps> = (props) => {
  const { t } = useTranslation(['home', 'common']);
  const { isAuthenticated } = useSession();
  const { pages, voteRemove, voteUp, voteDown } = useTopCommentedPages(
    props.pages,
    props.minCommentsVoteSum,
    props.pagesLimit
  );

  return (
    <section className={props.className}>
      <SectionHeader>{t('pages rankings.top commented.title')}</SectionHeader>
      <PagesList
        className="py-8"
        authenticated={isAuthenticated}
        actionHandler={{
          onVoteDown: voteDown,
          onVoteUp: voteUp,
          onVoteRemove: voteRemove
        }}
        hrefBuilder={websiteHref}
        pages={pages}
      />
      <Button href={topCommentedPagesHref()} outlined>
        {t('common:buttons.view all')}
      </Button>
    </section>
  );
};
