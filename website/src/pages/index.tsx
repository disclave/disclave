import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { HomePage } from '@/modules/pages/home';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getAuthProvider, getCommentService } from '@disclave/server';
import { CommentModel, SessionModel } from '@disclave/client';
import React from 'react';
import { getSessionCookie } from '@disclave/server';
import { SessionProvider } from '@disclave/client';

export const homeHref = () => '/';

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  await initServer();

  const authProvider = getAuthProvider();
  const service = getCommentService();

  const sessionCookie = getSessionCookie(context.req);
  const session = await authProvider.getSession(sessionCookie);

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
  session: SessionModel | null;
}

const Home: React.VFC<HomeProps> = (props) => {
  return (
    <SessionProvider>
      <HomePage
        commentsLimit={props.commentsLimit}
        topComments={props.topComments}
        topMinVoteSum={props.topMinVoteSum}
        latestComments={props.latestComments}
        latestMinVoteSum={props.latestMinVoteSum}
      />
    </SessionProvider>
  );
};
export default Home;
