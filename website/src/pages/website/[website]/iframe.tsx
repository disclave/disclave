import React from 'react';
import { GetServerSideProps } from 'next';
import { CommentModel, SessionModel, SessionProvider } from '@disclave/client';
import { getAuthProvider, getCommentService, getSessionCookie } from '@disclave/server';
import { initServer } from '@/modules/server';
import { WebsiteIframePage } from '@/modules/pages/website/iframe';

export const websiteIframeHref = (url: string) => `/website/${url}/iframe/`;

export const getServerSideProps: GetServerSideProps<IFrameProps> = async (context) => {
  await initServer();
  const website = context.query.website as string;

  const authProvider = getAuthProvider();
  const service = getCommentService();

  const sessionCookie = getSessionCookie(context.req);
  const session = await authProvider.getSession(sessionCookie);

  const comments = await service.getComments(website, session?.uid);

  return {
    props: {
      comments,
      website: website,
      session: session
    }
  };
};

interface IFrameProps {
  comments: Array<CommentModel>;
  website: string;
  session: SessionModel | null;
}

const Index: React.FC<IFrameProps> = (props) => {
  // useEffect(() => {
  //   if (!window) {
  //     console.error('Window not available. Can not initialize message listener.');
  //     return;
  //   }
  //
  //   const eventListener = (ev: MessageEvent) => {
  //     console.log(ev);
  //     // const data = JSON.parse(ev.data);
  //     // if (data.type == 'LOGIN') {
  //     //   loginGql(data.content.idToken);
  //     // }
  //   };
  //
  //   window.addEventListener('message', eventListener, false);
  //   return () => {
  //     window.removeEventListener('message', eventListener);
  //   };
  // }, []);

  return (
    <SessionProvider savedSession={props.session}>
      <WebsiteIframePage website={props.website} comments={props.comments} />
    </SessionProvider>
  );
};
export default Index;
