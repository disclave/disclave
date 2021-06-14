import React from 'react';
import { Layout } from '@/modules/layout';
import { RankingCommentModel, useSession } from '@disclave/client';
import { RankingCommentsList } from '@disclave/ui';
import { useLatestComments } from '@/modules/comments';
import { websiteHrefFromMeta } from '@/pages/website/[website]';
import { useTranslation } from 'next-i18next';

export interface LatestCommentsPageProps {
  comments: Array<RankingCommentModel>;
  commentsLimit: number;
  minVoteSum: number;
}

export const LatestCommentsPage: React.VFC<LatestCommentsPageProps> = (props) => {
  const { t } = useTranslation('comments');
  const { isAuthenticated } = useSession();
  const { comments, voteDown, voteUp, voteRemove } = useLatestComments(
    props.comments,
    props.minVoteSum,
    props.commentsLimit
  );

  return (
    <Layout>
      <section className="container mx-auto max-w-3xl py-8 px-4">
        <h1 className="text-3xl pb-4">{t('latest.header')}</h1>
        <RankingCommentsList
          actionsHandler={{ onVoteDown: voteDown, onVoteRemove: voteRemove, onVoteUp: voteUp }}
          authenticated={isAuthenticated}
          comments={comments}
          hrefBuilder={websiteHrefFromMeta}
        />
      </section>
    </Layout>
  );
};
