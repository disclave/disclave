import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentsContainer } from '@disclave/ui';
import { loginHref } from '@/pages/auth/login';
import { CommentModel, logout, useSession } from '@disclave/client';
import { registerHref } from '@/pages/auth/register';
import { useComments } from '@/modules/comments';
import { getCommentService } from '@disclave/server';
import { initServer } from '@/modules/server';
import { useContainerHeightMessage } from '@/modules/iframe';

export const websiteIframeHref = (url: string) => `/website/${url}/iframe/`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  await initServer();
  const { website } = context.query;
  const service = getCommentService();
  // TODO: get user id from cookie
  const comments = await service.getComments(website as string, null);

  return {
    props: {
      comments
    }
  };
};

interface WebsiteProps {
  comments: Array<CommentModel>;
}

const Index: React.FC<WebsiteProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>();
  useContainerHeightMessage(containerRef);

  const [userProfile] = useSession();

  const router = useRouter();
  const website = router.query.website as string;

  const { comments, addComment, addVoteUp, addVoteDown, removeVote } = useComments(
    props.comments,
    website
  );

  const loginHrefWithRedirect = loginHref();
  const registerHrefWithRedirect = registerHref();

  return (
    <div ref={containerRef} className="w-full p-3">
      <CommentsContainer
        userProfile={userProfile}
        comments={comments}
        className="h-max"
        inputTop={true}
        iframe={true}
        loginHref={loginHrefWithRedirect}
        registerHref={registerHrefWithRedirect}
        onSubmit={addComment}
        onLogout={logout}
        onVoteDown={addVoteDown}
        onVoteRemove={removeVote}
        onVoteUp={addVoteUp}
      />
    </div>
  );
};
export default Index;
