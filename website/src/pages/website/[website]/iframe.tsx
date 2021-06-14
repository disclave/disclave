import React from 'react';
import { GetServerSideProps } from 'next';
import { PageCommentModel, PageDetailsModel } from '@disclave/client';
import { getPageCommentService, getPageService, getUserCookie } from '@disclave/server';
import { initServer } from '@/modules/server';
import { WebsiteIframePage } from '@/modules/layout/website/iframe';
import { NextSeo } from 'next-seo';
import { domain } from '@/consts';
import { websiteHref } from '.';

export const websiteIframeHref = (url: string) => `/website/${url}/iframe/`;

export const getServerSideProps: GetServerSideProps<IFrameProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const commentService = getPageCommentService();
  const pageService = getPageService();

  const website = context.query.website as string;
  const pageDetails = await pageService.getPageDetails(website, userCookie?.uid);
  const urlId = {
    websiteId: pageDetails.websiteId,
    pageId: pageDetails.pageId
  };

  const commentsPromise = commentService.getPageComments(urlId, userCookie?.uid);

  const hideVotes = context.query.hideVotes !== undefined;

  return {
    props: {
      comments: await commentsPromise,
      pageDetails: pageDetails,
      website: website,
      hideVotes,
      serverSideUid: userCookie ? userCookie.uid : null,
      iframe: true
    }
  };
};

interface IFrameProps {
  comments: Array<PageCommentModel>;
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
