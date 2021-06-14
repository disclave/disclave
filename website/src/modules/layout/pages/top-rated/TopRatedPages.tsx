import React from 'react';
import { Layout } from '@/modules/layout';
import { RankingPageModel, useSession } from '@disclave/client';
import { PagesList } from '@disclave/ui';
import { websiteHref } from '@/pages/website/[website]';
import { useTranslation } from 'next-i18next';
import { useTopRatedPages } from '@/modules/pages';

export interface TopRatedPagesProps {
  pages: Array<RankingPageModel>;
  pagesLimit: number;
  minPagesVoteSum: number;
  minCommentsVoteSum: number;
}

export const TopRatedPages: React.VFC<TopRatedPagesProps> = (props) => {
  const { t } = useTranslation('pages');
  const { isAuthenticated } = useSession();
  const { pages, voteRemove, voteUp, voteDown } = useTopRatedPages(
    props.pages,
    props.minPagesVoteSum,
    props.minCommentsVoteSum,
    props.pagesLimit
  );

  return (
    <Layout>
      <section className="container mx-auto max-w-3xl py-8 px-4">
        <h1 className="text-3xl pb-4">{t('top rated.header')}</h1>
        <PagesList
          authenticated={isAuthenticated}
          actionHandler={{
            onVoteDown: voteDown,
            onVoteUp: voteUp,
            onVoteRemove: voteRemove
          }}
          hrefBuilder={websiteHref}
          pages={pages}
        />
      </section>
    </Layout>
  );
};
