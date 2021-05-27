import React from 'react';
import { Layout } from '@/modules/layout';
import { PageModel, useSession } from '@disclave/client';
import { PagesList } from '@disclave/ui';
import { websiteHref } from '@/pages/website/[website]';
import { useTranslation } from 'next-i18next';
import { useTopCommentedPages } from '@/modules/pages';

export interface TopCommentedPagesProps {
  pages: Array<PageModel>;
  pagesLimit: number;
  minCommentsVoteSum: number;
}

export const TopCommentedPages: React.VFC<TopCommentedPagesProps> = (props) => {
  const { t } = useTranslation('pages');
  const { isAuthenticated } = useSession();
  const { pages, voteRemove, voteUp, voteDown } = useTopCommentedPages(
    props.pages,
    props.minCommentsVoteSum,
    props.pagesLimit
  );

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <h1 className="text-3xl pb-4">{t('top commented.header')}</h1>
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
        </div>
      </section>
    </Layout>
  );
};
