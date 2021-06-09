import React from 'react';
import { GetServerSideProps } from 'next';
import { CommentModel, CommentUrlMeta, encodeUrl, PageDetailsModel } from '@disclave/client';
import { getCommentService, getUserCookie, getPageService } from '@disclave/server';
import { WebsitePage } from '@/modules/layout/website';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { initServer } from '@/modules/server';
import { usePageDetails } from '@/modules/pages';

export const websiteHrefFromIds = (websiteId: string, pageId: string) =>
  websiteHrefFromMeta({ websiteId, pageId });
export const websiteHrefFromMeta = (urlMeta: CommentUrlMeta, commentId?: string) =>
  websiteHref(urlMeta.websiteId + urlMeta.pageId + (commentId ? `#${commentId}` : ''), true);
export const websiteHref = (url: string, encoded: boolean = false) =>
  websiteHrefRaw + (encoded ? url : encodeUrl(url));
export const websiteHrefRaw = '/website/';

export const getServerSideProps: GetServerSideProps<WebsiteProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const commentService = getCommentService();
  const pageService = getPageService();

  const translationsPromise = serverSideTranslations(context.locale, [
    'common',
    'layout',
    'website'
  ]);

  const website = context.query.website as string;
  const pageDetails = await pageService.getSavedPageDetails(website, userCookie?.uid);
  const commentsPromise = pageDetails
    ? commentService.getComments(
        { websiteId: pageDetails.websiteId, pageId: pageDetails.pageId },
        userCookie?.uid
      )
    : [];

  return {
    props: {
      comments: await commentsPromise,
      pageDetails: pageDetails,
      website: website,
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface WebsiteProps {
  comments: Array<CommentModel>;
  pageDetails: PageDetailsModel | null;
  website: string;
}

const Website: React.FC<WebsiteProps> = (props) => {
  const { pageDetails } = usePageDetails(props.website, props.pageDetails);

  return (
    <WebsitePage website={props.website} pageDetails={pageDetails} comments={props.comments} />
  );
};
export default Website;
