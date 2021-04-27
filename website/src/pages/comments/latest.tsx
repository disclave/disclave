import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getCommentService } from '@disclave/server';
import { CommentModel } from '@disclave/client';
import React from 'react';
import { LatestCommentsPage } from '@/modules/pages/comments/latest';
import { getSession } from 'next-auth/client';

export const latestCommentsHref = () => '/comments/latest';

export const getServerSideProps: GetServerSideProps<LatestCommentsProps> = async (context) => {
  await initServer();
  const session = await getSession(context);
  const service = getCommentService();

  const minVoteSum = 1;
  const commentsLimit = 0;

  const topCommentsPromise = service.getLatestComments(minVoteSum, commentsLimit, session?.uid);
  const translationsPromise = serverSideTranslations(context.locale, [
    'comments',
    'common',
    'layout'
  ]);

  return {
    props: {
      comments: await topCommentsPromise,
      commentsLimit: commentsLimit,
      minVoteSum: minVoteSum,
      session: session,
      ...(await translationsPromise)
    }
  };
};

interface LatestCommentsProps {
  comments: Array<CommentModel>;
  commentsLimit: number;
  minVoteSum: number;
}

const LatestComments: React.VFC<LatestCommentsProps> = (props) => {
  return (
    <LatestCommentsPage
      comments={props.comments}
      commentsLimit={props.commentsLimit}
      minVoteSum={props.minVoteSum}
    />
  );
};
export default LatestComments;
