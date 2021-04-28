import React from 'react';
import { GetServerSideProps } from 'next';
import { CommentModel } from '@disclave/client';
import { getCommentService } from '@disclave/server';
import { initServer } from '@/modules/server';
import { WebsiteIframePage } from '@/modules/pages/website/iframe';
import { getSession } from 'next-auth/client';

export const websiteIframeHref = (url: string) => `/website/${url}/iframe/`;

export const getServerSideProps: GetServerSideProps<IFrameProps> = async (context) => {
  await initServer();
  const session = await getSession(context);
  const service = getCommentService();

  const website = context.query.website as string;
  const comments = await service.getComments(website, session?.uid);

  return {
    props: {
      comments,
      session: session,
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
