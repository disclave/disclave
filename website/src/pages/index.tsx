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
  const topCommentsLimit = 5;
  const latestMinVoteSum = 1;
  const latestCommentsLimit = 6;

  const topCommentsPromise = commentService.getTopComments(topMinVoteSum, topCommentsLimit, userCookie?.uid);
  const latestCommentsPromise = commentService.getLatestComments(
    latestMinVoteSum,
    latestCommentsLimit,
    userCookie?.uid
  );

  const topCommentedMinVoteSum = 1;
  const pagesLimit = 7;
  const topCommentedPagesPromise = pageService.getTopCommentedPages(topCommentedMinVoteSum, pagesLimit);

  const translationsPromise = serverSideTranslations(context.locale, ['common', 'home', 'layout']);

  return {
    props: {
      topComments: await topCommentsPromise,
      topCommentsLimit: topCommentsLimit,
      topMinVoteSum: topMinVoteSum,
      topCommentedPages: await topCommentedPagesPromise,
      latestComments: await latestCommentsPromise,
      latestCommentsLimit: latestCommentsLimit,
      latestMinVoteSum: latestMinVoteSum,
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface HomeProps {
  topComments: Array<CommentModel>;
  topCommentsLimit: number;
  topMinVoteSum: number;
  topCommentedPages: Array<PageModel>;
  latestComments: Array<CommentModel>;
  latestCommentsLimit: number;
  latestMinVoteSum: number;
}

const Home: React.VFC<HomeProps> = (props) => {
  return (
    <HomePage
      topComments={props.topComments}
      topCommentsLimit={props.topCommentsLimit}
      topMinVoteSum={props.topMinVoteSum}
      topCommentedPages={props.topCommentedPages}
      latestComments={props.latestComments}
      latestCommentsLimit={props.latestCommentsLimit}
      latestMinVoteSum={props.latestMinVoteSum}
    />
  );
};
export default Home;
