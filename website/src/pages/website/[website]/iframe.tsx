import React from 'react';
import { GetServerSideProps } from 'next';
import { CommentModel } from '@disclave/client';
import { getCommentService, getUserCookie } from '@disclave/server';
import { initServer } from '@/modules/server';
import { WebsiteIframePage } from '@/modules/layout/website/iframe';

export const websiteIframeHref = (url: string) => `/website/${url}/iframe/`;

export const getServerSideProps: GetServerSideProps<IFrameProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const service = getCommentService();

  const website = context.query.website as string;
  const comments = await service.getComments(website, userCookie?.uid);

  return {
    props: {
      comments,
      serverSideUid: userCookie ? userCookie.uid : null,
      website: website,
      iframe: true
    }
  };
};

interface IFrameProps {
  comments: Array<CommentModel>;
  website: string;
}

const Index: React.FC<IFrameProps> = (props) => {
  return <WebsiteIframePage website={props.website} comments={props.comments} />;
};
export default Index;
