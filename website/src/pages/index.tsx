import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import React from 'react';
import { initServer } from '@/modules/server';
import { getCommentService, getPageService, getUserCookie } from '@disclave/server';
import { CommentModel, PageModel } from '@disclave/client';
import { HomePage } from '@/modules/layout/home';

export const homeHref = () => '/';

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  await initServer(false);
  const userCookie = getUserCookie(context.req);
  const commentService = getCommentService();
  const pageService = getPageService();

  const topCommentsConfig = {
    limit: 5,
    minVoteSum: 1
  };
  const topCommentsPromise = commentService.getTopComments(
    topCommentsConfig.minVoteSum,
    topCommentsConfig.limit,
    userCookie?.uid
  );

  const latestCommentsConfig = {
    limit: 5,
    minVoteSum: 1
  };
  const latestCommentsPromise = commentService.getLatestComments(
    latestCommentsConfig.minVoteSum,
    latestCommentsConfig.limit,
    userCookie?.uid
  );

  const topCommentedPagesConfig = {
    limit: 6,
    commentsMinVoteSum: 1
  };
  const topCommentedPagesPromise = pageService.getTopCommentedPages(
    topCommentedPagesConfig.commentsMinVoteSum,
    topCommentedPagesConfig.limit,
    userCookie?.uid
  );

  const topRatedPagesConfig = {
    limit: 7,
    minVoteSum: 0
  };
  const topRatedPagesPromise = pageService.getTopRatedPages(
    topRatedPagesConfig.minVoteSum,
    topRatedPagesConfig.limit,
    userCookie?.uid
  );

  const translationsPromise = serverSideTranslations(context.locale, ['common', 'home', 'layout']);

  return {
    props: {
      topComments: {
        comments: await topCommentsPromise,
        limit: topCommentsConfig.limit,
        minVoteSum: topCommentsConfig.minVoteSum
      },
      topCommentedPages: {
        pages: await topCommentedPagesPromise,
        limit: topCommentedPagesConfig.limit,
        minCommentsVoteSum: topCommentedPagesConfig.commentsMinVoteSum
      },
      topRatedPages: {
        pages: await topRatedPagesPromise,
        limit: topRatedPagesConfig.limit,
        minVoteSum: topRatedPagesConfig.minVoteSum
      },
      latestComments: {
        comments: await latestCommentsPromise,
        limit: latestCommentsConfig.limit,
        minVoteSum: latestCommentsConfig.minVoteSum
      },
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface HomeProps {
  topComments: {
    comments: Array<CommentModel>;
    limit: number;
    minVoteSum: number;
  };
  topCommentedPages: {
    pages: Array<PageModel>;
    limit: number;
    minCommentsVoteSum: number;
  };
  topRatedPages: {
    pages: Array<PageModel>;
    limit: number;
    minVoteSum: number;
  };
  latestComments: {
    comments: Array<CommentModel>;
    limit: number;
    minVoteSum: number;
  };
}

const Home: React.VFC<HomeProps> = (props) => {
  return (
    <HomePage
      topComments={props.topComments}
      topCommentedPages={props.topCommentedPages}
      latestComments={props.latestComments}
    />
  );
};
export default Home;
