import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { PageCommentsContainer } from '@disclave/ui';
import { loginHref } from '@/pages/auth/login';
import { CommentModel, loginGql, logout, useSession } from '@disclave/client';
import { registerHref } from '@/pages/auth/register';
import { useWebsiteComments } from '@/modules/comments';
import { getCommentService, getUserCookie } from '@disclave/server';
import { initServer } from '@/modules/server';
import { useContainerHeightMessage } from '@/modules/iframe';

export const websiteIframeHref = (url: string) => `/website/${url}/iframe/`;

export const getServerSideProps: GetServerSideProps<IFrameProps> = async (context) => {
  await initServer();
  const { website } = context.query;

  const userCookie = getUserCookie(context.req);
  const service = getCommentService();

  const comments = await service.getComments(website as string, userCookie?.uid);

  return {
    props: {
      comments,
      serverSideUid: userCookie?.uid || null
    }
  };
};

interface IFrameProps {
  comments: Array<CommentModel>;
  serverSideUid: string | null;
}

const Index: React.FC<IFrameProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>();
  useContainerHeightMessage(containerRef);

  const { profile } = useSession();

  const router = useRouter();
  const website = router.query.website as string;

  const { comments, addComment, voteDown, voteUp, voteRemove } = useWebsiteComments(
    props.comments,
    website,
    props.serverSideUid
  );

  const loginHrefWithRedirect = loginHref();
  const registerHrefWithRedirect = registerHref();

  useEffect(() => {
    if (!window) {
      console.error('Window not available. Can not initialize message listener.');
      return;
    }

    const eventListener = (ev: MessageEvent) => {
      console.log(ev);
      // const data = JSON.parse(ev.data);
      // if (data.type == 'LOGIN') {
      //   loginGql(data.content.idToken);
      // }
    };

    window.addEventListener('message', eventListener, false);
    return () => {
      window.removeEventListener('message', eventListener);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full p-3">
      <PageCommentsContainer
        userProfile={profile}
        comments={comments}
        className="h-max"
        inputTop={true}
        iframe={true}
        loginHref={loginHrefWithRedirect}
        registerHref={registerHrefWithRedirect}
        onSubmit={addComment}
        onLogout={logout}
        commentsActionsHandler={{
          onVoteDown: voteDown,
          onVoteRemove: voteRemove,
          onVoteUp: voteUp
        }}
      />
    </div>
  );
};
export default Index;
