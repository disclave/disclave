import React from 'react';
import { GetServerSideProps } from 'next';
import {
  PageCommentModel,
  UrlId,
  encodeUrl,
  PageDetailsModel,
  RankingPageModel
} from '@disclave/client';
import {
  getPageCommentService,
  getUserCookie,
  getPageDetailsService,
  getPageRankingService
} from '@disclave/server';
import { WebsitePage } from '@/modules/layout/website';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { initServer } from '@/modules/server';
import { usePageDetails } from '@/modules/pages';

export const websiteHrefFromIds = (websiteId: string, pageId: string) =>
  websiteHrefFromMeta({ websiteId, pageId });
export const websiteHrefFromMeta = (urlId: UrlId, commentId?: string) =>
  websiteHref(urlId.websiteId + urlId.pageId + (commentId ? `#${commentId}` : ''), true);
export const websiteHref = (url: string, encoded: boolean = false) =>
  websiteHrefRaw + (encoded ? url : encodeUrl(url));
export const websiteHrefRaw = '/website/';

export const getServerSideProps: GetServerSideProps<WebsiteProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const commentService = getPageCommentService();
  const pageDetailsService = getPageDetailsService();
  const pageRankingService = getPageRankingService();

  const translationsPromise = serverSideTranslations(context.locale, [
    'common',
    'layout',
    'website'
  ]);

  const website = context.query.website as string;
  const pageDetails = await pageDetailsService.getSavedPageDetails(website, userCookie?.uid);
  const commentsPromise = pageDetails
    ? commentService.getPageComments(
        { websiteId: pageDetails.websiteId, pageId: pageDetails.pageId },
        userCookie?.uid
      )
    : [];

  const topRatedPagesConfig = {
    limit: 5,
    pageMinVoteSum: 0,
    commentsMinVoteSum: 0,
    websiteId: pageDetails?.websiteId ?? null,
    excludePageId: pageDetails?.pageId ?? null
  };
  const topRatedPagesPromise = pageDetails
    ? pageRankingService.getTopRatedPages(topRatedPagesConfig, userCookie?.uid)
    : [];

  const topCommentedPagesConfig = {
    limit: 5,
    commentsMinVoteSum: 0,
    websiteId: pageDetails?.websiteId ?? null,
    excludePageId: pageDetails?.pageId ?? null
  };
  const topCommentedPagesPromise = pageDetails
    ? pageRankingService.getTopCommentedPages(topCommentedPagesConfig, userCookie?.uid)
    : [];

  return {
    props: {
      comments: await commentsPromise,
      pageDetails: pageDetails,
      website: website,
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
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface WebsiteProps {
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

const Website: React.FC<WebsiteProps> = (props) => {
  const { pageDetails } = usePageDetails(props.website, props.pageDetails);

  return (
    <WebsitePage
      website={props.website}
      pageDetails={pageDetails}
      comments={props.comments}
      topCommentedPages={props.topCommentedPages}
      topRatedPages={props.topRatedPages}
    />
  );
};
export default Website;
