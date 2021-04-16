import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getAuthProvider, getCommentService, getSessionCookie } from '@disclave/server';
import { CommentModel, SessionModel, useSession } from '@disclave/client';
import React from 'react';
import { TopCommentsPage } from '@/modules/pages/comments/top';

export const topCommentsHref = () => '/comments/top';

export const getServerSideProps: GetServerSideProps<TopCommentsProps> = async (context) => {
  await initServer();

  const authProvider = getAuthProvider();
  const service = getCommentService();

  const sessionCookie = getSessionCookie(context.req);
  const session = await authProvider.getSession(sessionCookie);

  const minVoteSum = 1;
  const commentsLimit = 0;

  const topCommentsPromise = service.getTopComments(minVoteSum, commentsLimit, session?.uid);
  const translationsPromise = serverSideTranslations(context.locale, [
    'comments',
    'common',
    'layout'
  ]);

  return {
    props: {
      comments: await topCommentsPromise,
      session: session,
      ...(await translationsPromise)
    }
  };
};

interface TopCommentsProps {
  comments: Array<CommentModel>;
  session: SessionModel | null;
}

const TopComments: React.VFC<TopCommentsProps> = (props) => {
  useSession(props.session);

  return <TopCommentsPage comments={props.comments} />;
};
export default TopComments;
