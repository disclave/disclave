import { DefaultProps, getDefaultProps } from '@/modules/server';
import { PageCommentModel, PageDetailsModel, RankingPageModel } from '@disclave/client';
import { IncomingMessage } from 'http';
import {
  getPageCommentService,
  getPageDetailsService,
  getPageRankingService
} from '@disclave/server';

export interface WebsiteProps extends DefaultProps {
  comments: Array<PageCommentModel>;
  pageDetails: PageDetailsModel | null;
  website: string;
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
}

export async function getWebsiteSSP(
  query: {
    website: string;
  },
  req: IncomingMessage,
  locale: string,
  translationNamespaces: string[]
): Promise<WebsiteProps> {
  const defaultProps = await getDefaultProps({ req, locale }, translationNamespaces, {
    key: query.website
  });

  const commentService = getPageCommentService();
  const pageDetailsService = getPageDetailsService();
  const pageRankingService = getPageRankingService();

  const pageDetails = await pageDetailsService.getSavedPageDetails(
    query.website,
    defaultProps.serverSideUid
  );
  const commentsPromise = pageDetails
    ? commentService.getPageComments(
        { websiteId: pageDetails.websiteId, pageId: pageDetails.pageId },
        defaultProps.serverSideUid
      )
    : [];

  const topRatedPagesConfig = {
    limit: 5,
    pageMinVoteSum: 1,
    commentsMinVoteSum: 0,
    websiteId: pageDetails?.websiteId ?? null,
    excludePageId: pageDetails?.pageId ?? null
  };
  const topRatedPagesPromise = pageDetails
    ? pageRankingService.getTopRatedPages(topRatedPagesConfig, defaultProps.serverSideUid)
    : [];

  const topCommentedPagesConfig = {
    limit: 5,
    commentsMinVoteSum: 0,
    websiteId: pageDetails?.websiteId ?? null,
    excludePageId: pageDetails?.pageId ?? null
  };
  const topCommentedPagesPromise = pageDetails
    ? pageRankingService.getTopCommentedPages(topCommentedPagesConfig, defaultProps.serverSideUid)
    : [];

  return {
    comments: await commentsPromise,
    pageDetails: pageDetails,
    website: query.website,
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
    ...defaultProps
  };
}
