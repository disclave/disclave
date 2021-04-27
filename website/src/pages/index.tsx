import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import React from 'react';
import { getSession } from 'next-auth/client';
import { initServer } from '@/modules/server';
import { getCommentService } from '@disclave/server';
import { CommentModel } from '@disclave/client';
import { HomePage } from '@/modules/pages/home';

export const homeHref = () => '/';

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  await initServer();
  const session = await getSession(context);
  const service = getCommentService();

  const topMinVoteSum = 1;
  const latestMinVoteSum = 1;
  const commentsLimit = 5;

  const topCommentsPromise = service.getTopComments(topMinVoteSum, commentsLimit, session?.uid);
  const latestCommentsPromise = service.getLatestComments(
    latestMinVoteSum,
    commentsLimit,
    session?.uid
  );
  const translationsPromise = serverSideTranslations(context.locale, ['common', 'home', 'layout']);

  return {
    props: {
      commentsLimit: commentsLimit,
      topComments: await topCommentsPromise,
      topMinVoteSum: topMinVoteSum,
      latestComments: await latestCommentsPromise,
      latestMinVoteSum: latestMinVoteSum,
      session: session,
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
