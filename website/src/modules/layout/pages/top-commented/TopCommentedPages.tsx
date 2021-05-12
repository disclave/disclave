import React from 'react';
import { Layout } from '@/modules/layout';
import { PageModel } from '@disclave/client';
import { PagesList } from '@disclave/ui';
import { websiteHrefFromIds } from '@/pages/website/[website]';
import { useTranslation } from 'next-i18next';
import { useTopCommentedPages } from '@/modules/pages';

export interface TopCommentedPagesProps {
  pages: Array<PageModel>;
}

export const TopCommentedPages: React.VFC<TopCommentedPagesProps> = (props) => {
  const { t } = useTranslation('pages');
  const { pages } = useTopCommentedPages(props.pages);

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <h1 className="text-3xl pb-4">{t('top commented.header')}</h1>
          <PagesList hrefBuilder={websiteHrefFromIds} pages={pages} />
        </div>
      </section>
    </Layout>
  );
};
