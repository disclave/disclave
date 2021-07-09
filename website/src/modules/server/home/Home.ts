import { getSortedPostsPreview, PostPreview } from '@/modules/blog';
import {
  CommentRankingService,
  getCommentRankingService,
  getPageRankingService,
  PageRankingService
} from '@disclave/server';
import { RankingCommentModel, RankingPageModel } from '@disclave/client';
import { DefaultProps, getDefaultProps } from '@/modules/server';
import { IncomingMessage } from 'http';

export interface HomeProps extends DefaultProps {
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

const topCommentsConfig = {
  limit: 5,
  minVoteSum: 1
};

const latestCommentsConfig = {
  limit: 5,
  minVoteSum: 1
};

const topCommentedPagesConfig = {
  limit: 6,
  commentsMinVoteSum: 0,
  websiteId: null,
  excludePageId: null
};

const topRatedPagesConfig = {
  limit: 7,
  pageMinVoteSum: 0,
  commentsMinVoteSum: 0,
  websiteId: null,
  excludePageId: null
};

export async function getHomeSSP(
  req: IncomingMessage,
  locale: string,
  translationNamespaces: string[]
): Promise<HomeProps> {
  const defaultProps = await getDefaultProps({ req, locale }, translationNamespaces);

  const commentRankingService = getCommentRankingService();
  const pageRankingService = getPageRankingService();

  const lastestBlogPosts = getSortedPostsPreview(3);

  const topCommentsPromise = getTopComments(commentRankingService, defaultProps.serverSideUid);
  const latestCommentsPromise = getLatestComments(
    commentRankingService,
    defaultProps.serverSideUid
  );

  const topCommentedPagesPromise = getTopCommentedPages(
    pageRankingService,
    defaultProps.serverSideUid
  );
  const topRatedPagesPromise = getTopRatedPages(pageRankingService, defaultProps.serverSideUid);

  return {
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
    ...defaultProps
  };
}

const getTopComments = async (service: CommentRankingService, uid: string | null) =>
  service.getTopComments(topCommentsConfig.minVoteSum, topCommentsConfig.limit, uid);

const getLatestComments = async (service: CommentRankingService, uid: string | null) =>
  service.getLatestComments(latestCommentsConfig.minVoteSum, latestCommentsConfig.limit, uid);

const getTopCommentedPages = async (service: PageRankingService, uid: string | null) =>
  service.getTopCommentedPages(topCommentedPagesConfig, uid);

const getTopRatedPages = async (service: PageRankingService, uid: string | null) =>
  service.getTopRatedPages(topRatedPagesConfig, uid);
