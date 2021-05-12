import React from 'react';
import { Layout } from '@/modules/layout';
import { PageModel } from '@disclave/client';
import { PreviewCommentsList } from '@disclave/ui';
import { useTopComments } from '@/modules/comments';
import { websiteHrefFromIds } from '@/pages/website/[website]';
import { useTranslation } from 'next-i18next';

export interface TopCommentedPagesPageProps {
  pages: Array<PageModel>;
  pagesLimit: number;
  minVoteSum: number;
}

export const TopCommentedPagesPage: React.VFC<TopCommentedPagesPageProps> = (props) => {
  const { t } = useTranslation('comments');
  // const { comments, voteDown, voteUp, voteRemove } = useTopComments(
  //   props.comments,
  //   props.minVoteSum,
  //   props.commentsLimit
  // );

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <h1 className="text-3xl pb-4">{t('top.header')}</h1>
          {/* <PreviewCommentsList
            actionsHandler={{ onVoteDown: voteDown, onVoteRemove: voteRemove, onVoteUp: voteUp }}
            authenticated={isAuthenticated}
            comments={comments}
            hrefBuilder={websiteHrefFromIds}
          /> */}
        </div>
      </section>
    </Layout>
  );
};
