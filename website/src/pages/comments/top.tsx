import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getCommentService } from '@disclave/server';
import { CommentModel } from '@disclave/client';
import React from 'react';
import { TopCommentsPage } from '@/modules/pages/comments/top';
import { getSession } from 'next-auth/client';

export const topCommentsHref = () => '/comments/top';

export const getServerSideProps: GetServerSideProps<TopCommentsProps> = async (context) => {
  await initServer();
  const session = await getSession(context);
  const service = getCommentService();

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
      commentsLimit: commentsLimit,
      minVoteSum: minVoteSum,
      session: session,
      ...(await translationsPromise)
    }
  };
};

interface TopCommentsProps {
  comments: Array<CommentModel>;
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
