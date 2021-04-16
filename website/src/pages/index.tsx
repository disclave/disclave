import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { HomePage } from '@/modules/pages/home';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getAuthProvider, getCommentService } from '@disclave/server';
import { CommentModel, SessionModel, useSession } from '@disclave/client';
import React from 'react';
import { getSessionCookie } from '@disclave/server';

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
      topComments: await topCommentsPromise,
      latestComments: await latestCommentsPromise,
      session: session,
      ...(await translationsPromise)
    }
  };
};

interface HomeProps {
  topComments: Array<CommentModel>;
  latestComments: Array<CommentModel>;
  session: SessionModel | null;
}

const Home: React.VFC<HomeProps> = (props) => {
  useSession(props.session);

  return <HomePage topComments={props.topComments} latestComments={props.latestComments} />;
};
export default Home;
