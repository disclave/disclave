import React from 'react';
import { GetServerSideProps } from 'next';
import { CommentModel, PageDetailsModel } from '@disclave/client';
import { getCommentService, getPageService, getUserCookie } from '@disclave/server';
import { initServer } from '@/modules/server';
import { WebsiteIframePage } from '@/modules/layout/website/iframe';
import { NextSeo } from 'next-seo';
import { domain } from '@/consts';
import { websiteHref } from '.';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const websiteIframeHref = (url: string) => `/website/${url}/iframe/`;

export const getServerSideProps: GetServerSideProps<IFrameProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const commentService = getCommentService();
  const pageService = getPageService();

  const website = context.query.website as string;
  const pageDetailsPromise = pageService.getPageDetails(website, false, userCookie?.uid);
  const commentsPromise = commentService.getComments(website, userCookie?.uid);
  const translationsPromise = serverSideTranslations(context.locale, ['iframe']);

  const hideVotes = context.query.hideVotes !== undefined;

  return {
    props: {
      comments: await commentsPromise,
      pageDetails: await pageDetailsPromise,
      website: website,
      hideVotes,
      serverSideUid: userCookie ? userCookie.uid : null,
      iframe: true,
      ...(await translationsPromise)
    }
  };
};

interface IFrameProps {
  comments: Array<CommentModel>;
  pageDetails: PageDetailsModel;
  website: string;
  hideVotes: boolean;
}

const IFrame: React.FC<IFrameProps> = (props) => {
  return (
    <>
      <NextSeo canonical={domain + websiteHref(props.website)} />
      <WebsiteIframePage
        website={props.website}
        pageDetails={props.pageDetails}
        comments={props.comments}
        hideVotes={props.hideVotes}
      />
    </>
  );
};
export default IFrame;
