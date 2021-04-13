import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getCommentService, getUserCookie } from '@disclave/server';
import { CommentModel } from '@disclave/client';
import React from 'react';
import { TopCommentsPage } from '@/modules/pages/comments/top';

export const getServerSideProps: GetServerSideProps<TopCommentsProps> = async (context) => {
  await initServer();

  const userCookie = getUserCookie(context.req);
  const service = getCommentService();

  const minVoteSum = 1;
  const commentsLimit = 0;

  const topCommentsPromise = service.getTopComments(minVoteSum, commentsLimit, userCookie?.uid);
  const translationsPromise = serverSideTranslations(context.locale, ['common', 'home', 'layout']);

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

interface TopCommentsProps {
  comments: Array<CommentModel>;
  commentsLimit: number;
  minVoteSum: number;
  serverSideUid: string | null;
}

const TopComments: React.VFC<TopCommentsProps> = (props) => {
  return (
    <TopCommentsPage
      comments={props.comments}
      commentsLimit={props.commentsLimit}
      minVoteSum={props.minVoteSum}
      serverSideUid={props.serverSideUid}
    />
  );
};
export default TopComments;
