import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import React from 'react';
import { initServer } from '@/modules/server';
import { getCommentService, getUserCookie } from '@disclave/server';
import { CommentModel } from '@disclave/client';
import { HomePage } from '@/modules/layout/home';

export const homeHref = () => '/';

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const service = getCommentService();

  const topMinVoteSum = 1;
  const latestMinVoteSum = 1;
  const commentsLimit = 5;

  const topCommentsPromise = service.getTopComments(topMinVoteSum, commentsLimit, userCookie?.uid);
  const latestCommentsPromise = service.getLatestComments(
    latestMinVoteSum,
    commentsLimit,
    userCookie?.uid
  );
  const translationsPromise = serverSideTranslations(context.locale, ['common', 'home', 'layout']);

  return {
    props: {
      commentsLimit: commentsLimit,
      topComments: await topCommentsPromise,
      topMinVoteSum: topMinVoteSum,
      latestComments: await latestCommentsPromise,
      latestMinVoteSum: latestMinVoteSum,
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface HomeProps {
  commentsLimit: number;
  topComments: Array<CommentModel>;
  topMinVoteSum: number;
  latestComments: Array<CommentModel>;
  latestMinVoteSum: number;
}

const Home: React.VFC<HomeProps> = (props) => {
  return (
    <HomePage
      commentsLimit={props.commentsLimit}
      topComments={props.topComments}
      topMinVoteSum={props.topMinVoteSum}
      latestComments={props.latestComments}
      latestMinVoteSum={props.latestMinVoteSum}
    />
  );
};
export default Home;
