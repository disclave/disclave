import React from 'react';
import { Layout } from '@/modules/layout';
import { CommentModel, useSession } from '@disclave/client';
import { PreviewCommentsList } from '@disclave/ui';
import { useTopComments } from '@/modules/comments';
import { websiteHrefFromMeta } from '@/pages/website/[website]';
import { useTranslation } from 'next-i18next';

export interface TopCommentsPageProps {
  comments: Array<CommentModel>;
  commentsLimit: number;
  minVoteSum: number;
}

export const TopCommentsPage: React.VFC<TopCommentsPageProps> = (props) => {
  const { t } = useTranslation('comments');
  const { isAuthenticated } = useSession();
  const { comments, voteDown, voteUp, voteRemove } = useTopComments(
    props.comments,
    props.minVoteSum,
    props.commentsLimit
  );

  return (
    <Layout>
      <section className="container mx-auto max-w-3xl py-8 px-4">
        <h1 className="text-3xl pb-4">{t('top.header')}</h1>
        <PreviewCommentsList
          actionsHandler={{ onVoteDown: voteDown, onVoteRemove: voteRemove, onVoteUp: voteUp }}
          authenticated={isAuthenticated}
          comments={comments}
          hrefBuilder={websiteHrefFromMeta}
        />
      </section>
    </Layout>
  );
};
