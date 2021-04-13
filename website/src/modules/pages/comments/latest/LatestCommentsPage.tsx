import React from 'react';
import { Layout } from '@/modules/layout';
import { CommentModel, useSession } from '@disclave/client';
import { CommentsList } from '@disclave/ui';
import { useLatestComments } from '@/modules/comments';
import { websiteHrefFromMeta } from '@/pages/website/[website]';
import { useTranslation } from 'next-i18next';

export interface LatestCommentsPageProps {
  comments: Array<CommentModel>;
  commentsLimit: number;
  minVoteSum: number;
  serverSideUid: string | null;
}

export const LatestCommentsPage: React.VFC<LatestCommentsPageProps> = (props) => {
  const { t } = useTranslation('comments');
  const { profile } = useSession();
  const { comments, voteDown, voteUp, voteRemove } = useLatestComments(
    props.comments,
    props.minVoteSum,
    props.commentsLimit,
    props.serverSideUid
  );

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <h1 className="text-3xl pb-4">{t('latest.header')}</h1>
          <CommentsList
            authenticated={!!profile}
            comments={comments}
            hrefBuilder={websiteHrefFromMeta}
            preview={true}
            showWebsite={true}
            onVoteUp={voteUp}
            onVoteDown={voteDown}
            onVoteRemove={voteRemove}
          />
        </div>
      </section>
    </Layout>
  );
};
