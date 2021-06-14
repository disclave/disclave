import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import React from 'react';
import { initServer } from '@/modules/server';
import { getCommentRankingService, getPageRankingService, getUserCookie } from '@disclave/server';
import { RankingCommentModel, RankingPageModel } from '@disclave/client';
import { HomePage } from '@/modules/layout/home';
import { getSortedPostsPreview, PostPreview } from '@/modules/blog';

export const homeHref = () => '/';

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  await initServer(false);
  const userCookie = getUserCookie(context.req);
  const commentRankingService = getCommentRankingService();
  const pageRankingService = getPageRankingService();

  const lastestBlogPosts = getSortedPostsPreview(3);

  const topCommentsConfig = {
    limit: 5,
    minVoteSum: 1
  };
  const topCommentsPromise = commentRankingService.getTopComments(
    topCommentsConfig.minVoteSum,
    topCommentsConfig.limit,
    userCookie?.uid
  );

  const latestCommentsConfig = {
    limit: 5,
    minVoteSum: 1
  };
  const latestCommentsPromise = commentRankingService.getLatestComments(
    latestCommentsConfig.minVoteSum,
    latestCommentsConfig.limit,
    userCookie?.uid
  );

  const topCommentedPagesConfig = {
    limit: 6,
    commentsMinVoteSum: 0,
    websiteId: null,
    excludePageId: null
  };
  const topCommentedPagesPromise = pageRankingService.getTopCommentedPages(
    topCommentedPagesConfig,
    userCookie?.uid
  );

  const topRatedPagesConfig = {
    limit: 7,
    pageMinVoteSum: 0,
    commentsMinVoteSum: 0,
    websiteId: null,
    excludePageId: null
  };
  const topRatedPagesPromise = pageRankingService.getTopRatedPages(
    topRatedPagesConfig,
    userCookie?.uid
  );

  const translationsPromise = serverSideTranslations(context.locale, ['common', 'home', 'layout']);

  return {
    props: {
      blog: {
        latestPosts: lastestBlogPosts
      },
      topComments: {
        comments: await topCommentsPromise,
        limit: topCommentsConfig.limit,
        minPagesVoteSum: topCommentsConfig.minVoteSum
      },
      topCommentedPages: {
        pages: await topCommentedPagesPromise,
        limit: topCommentedPagesConfig.limit,
        minCommentsVoteSum: topCommentedPagesConfig.commentsMinVoteSum
      },
      topRatedPages: {
        pages: await topRatedPagesPromise,
        limit: topRatedPagesConfig.limit,
        minPagesVoteSum: topRatedPagesConfig.pageMinVoteSum,
        minCommentsVoteSum: topRatedPagesConfig.commentsMinVoteSum
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
  blog: {
    latestPosts: Array<PostPreview>;
  };
  topComments: {
    comments: Array<RankingCommentModel>;
    limit: number;
    minPagesVoteSum: number;
  };
  topCommentedPages: {
    pages: Array<RankingPageModel>;
    limit: number;
    minCommentsVoteSum: number;
  };
  topRatedPages: {
    pages: Array<RankingPageModel>;
    limit: number;
    minPagesVoteSum: number;
    minCommentsVoteSum: number;
  };
  latestComments: {
    comments: Array<RankingCommentModel>;
    limit: number;
    minVoteSum: number;
  };
}

const Home: React.VFC<HomeProps> = (props) => {
  return (
    <HomePage
      blog={props.blog}
      topComments={props.topComments}
      topCommentedPages={props.topCommentedPages}
      topRatedPages={props.topRatedPages}
      latestComments={props.latestComments}
    />
  );
};
export default Home;
