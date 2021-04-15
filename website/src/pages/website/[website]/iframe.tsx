import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { PageCommentsContainer } from '@disclave/ui';
import { loginHref } from '@/pages/auth/login';
import { CommentModel, logout, useSession } from '@disclave/client';
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

  useEffect(() => {
    try {
      console.info('Testing local storage');
      localStorage.setItem('websiteId', website);
      console.info('Local storage test success');
    } catch (e) {
      console.error('Local storage test error', e);
    }

    try {
      console.info('Testing cookies');
      document.cookie = 'cookie2=test; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/';
      document.cookie = `websiteId=${encodeURIComponent(
        website
      )}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
      console.info('Cookies test success');
    } catch (e) {
      console.error('Cookies test error', e);
    }

    try {
      console.info('Testing indexedDB');
      var request = window.indexedDB.open('MyTestDatabase', 1);
      request.onerror = function (event) {
        console.error('indexedDB test error', event);
      };
      request.onsuccess = function (event) {
        console.info('indexedDB test success');
      };
    } catch (e) {
      console.error('indexedDB test error', e);
    }
  }, []);

  const { comments, addComment, voteDown, voteUp, voteRemove } = useWebsiteComments(
    props.comments,
    website,
    props.serverSideUid
  );

  const loginHrefWithRedirect = loginHref();
  const registerHrefWithRedirect = registerHref();

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
