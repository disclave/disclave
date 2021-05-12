import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import React from 'react';
import { initServer } from '@/modules/server';
import { getCommentService, getPageService, getUserCookie } from '@disclave/server';
import { CommentModel, PageModel } from '@disclave/client';
import { HomePage } from '@/modules/layout/home';

export const homeHref = () => '/';

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const commentService = getCommentService();
  const pageService = getPageService();

  const topMinVoteSum = 1;
  const latestMinVoteSum = 1;
  const commentsLimit = 5;

  const topCommentsPromise = commentService.getTopComments(topMinVoteSum, commentsLimit, userCookie?.uid);
  const latestCommentsPromise = commentService.getLatestComments(
    latestMinVoteSum,
    commentsLimit,
    userCookie?.uid
  );

  const topCommentedMinVoteSum = 1;
  const pagesLimit = 5;
  const topCommentedPagesPromise = pageService.getTopCommentedPages(topCommentedMinVoteSum, pagesLimit);

  const translationsPromise = serverSideTranslations(context.locale, ['common', 'home', 'layout']);

  return {
    props: {
      commentsLimit: commentsLimit,
      topComments: await topCommentsPromise,
      topMinVoteSum: topMinVoteSum,
      topCommentedPages: await topCommentedPagesPromise,
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
  topCommentedPages: Array<PageModel>;
  latestComments: Array<CommentModel>;
  latestMinVoteSum: number;
}

const Home: React.VFC<HomeProps> = (props) => {
  return (
    <HomePage
      commentsLimit={props.commentsLimit}
      topComments={props.topComments}
      topMinVoteSum={props.topMinVoteSum}
      topCommentedPages={props.topCommentedPages}
      latestComments={props.latestComments}
      latestMinVoteSum={props.latestMinVoteSum}
    />
  );
};
export default Home;
