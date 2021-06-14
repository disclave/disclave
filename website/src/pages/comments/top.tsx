import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getCommentRankingService, getUserCookie } from '@disclave/server';
import { RankingCommentModel } from '@disclave/client';
import React from 'react';
import { TopCommentsPage } from '@/modules/layout/comments/top';

export const topCommentsHref = () => '/comments/top';

export const getServerSideProps: GetServerSideProps<TopCommentsProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const service = getCommentRankingService();

  const minVoteSum = 1;
  const commentsLimit = 0;

  const topCommentsPromise = service.getTopComments(minVoteSum, commentsLimit, userCookie?.uid);
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
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface TopCommentsProps {
  comments: Array<RankingCommentModel>;
  commentsLimit: number;
  minVoteSum: number;
}

const TopComments: React.VFC<TopCommentsProps> = (props) => {
  return (
    <TopCommentsPage
      comments={props.comments}
      commentsLimit={props.commentsLimit}
      minVoteSum={props.minVoteSum}
    />
  );
};
export default TopComments;
