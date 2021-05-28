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

  const topMinVoteSum = 1;
  const topCommentsLimit = 5;
  const latestMinVoteSum = 1;
  const latestCommentsLimit = 6;

  const topCommentsPromise = commentService.getTopComments(
    topMinVoteSum,
    topCommentsLimit,
    userCookie?.uid
  );
  const latestCommentsPromise = commentService.getLatestComments(
    latestMinVoteSum,
    latestCommentsLimit,
    userCookie?.uid
  );

  const topCommentedPagesCommentsMinVoteSum = 1;
  const topCommentedPagesLimit = 7;
  const topCommentedPagesPromise = pageService.getTopCommentedPages(
    topCommentedPagesCommentsMinVoteSum,
    topCommentedPagesLimit,
    userCookie?.uid
  );

  const topRatedPagesMinVoteSum = 0;
  const topRatedPagesLimit = 7;
  const topRatedPagesPromise = pageService.getTopRatedPages(
    topRatedPagesMinVoteSum,
    topRatedPagesLimit,
    userCookie?.uid
  );

  const translationsPromise = serverSideTranslations(context.locale, ['common', 'home', 'layout']);

  return {
    props: {
      topComments: {
        comments: await topCommentsPromise,
        limit: topCommentsLimit,
        minVoteSum: topMinVoteSum
      },
      topCommentedPages: {
        pages: await topCommentedPagesPromise,
        limit: topCommentedPagesLimit,
        minCommentsVoteSum: topCommentedPagesCommentsMinVoteSum
      },
      topRatedPages: {
        pages: await topRatedPagesPromise
      },
      latestComments: {
        comments: await latestCommentsPromise,
        limit: latestCommentsLimit,
        minVoteSum: latestMinVoteSum
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
