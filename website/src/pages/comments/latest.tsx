import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getCommentService, getUserCookie } from '@disclave/server';
import { CommentModel } from '@disclave/client';
import React from 'react';
import { LatestCommentsPage } from '@/modules/pages/comments/latest';

export const latestCommentsHref = () => '/comments/latest';

export const getServerSideProps: GetServerSideProps<LatestCommentsProps> = async (context) => {
  await initServer();

  const userCookie = getUserCookie(context.req);
  const service = getCommentService();

  const minVoteSum = 1;
  const commentsLimit = 0;

  const topCommentsPromise = service.getLatestComments(minVoteSum, commentsLimit, userCookie?.uid);
  const translationsPromise = serverSideTranslations(context.locale, ['common', 'layout']);

  return {
    props: {
      comments: await topCommentsPromise,
      commentsLimit: commentsLimit,
      minVoteSum: minVoteSum,
      serverSideUid: userCookie?.uid || null,
      ...(await translationsPromise)
    }
  };
};

interface LatestCommentsProps {
  comments: Array<CommentModel>;
  commentsLimit: number;
  minVoteSum: number;
  serverSideUid: string | null;
}

const LatestComments: React.VFC<LatestCommentsProps> = (props) => {
  return (
    <LatestCommentsPage
      comments={props.comments}
      commentsLimit={props.commentsLimit}
      minVoteSum={props.minVoteSum}
      serverSideUid={props.serverSideUid}
    />
  );
};
export default LatestComments;
