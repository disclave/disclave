import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentsContainer } from '@disclave/ui';
import { loginHref } from '@/pages/auth/login';
import { CommentModel, logout, useSession } from '@disclave/client';
import { registerHref } from '@/pages/auth/register';
import { useComments } from '@/modules/comments';
import { getCommentService } from '@disclave/server';
import { initServer } from '@/modules/server';

export const websiteIframeHref = (url: string) => `/website/${url}/iframe/`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  await initServer();
  const { website } = context.query;
  const service = getCommentService();
  const comments = await service.getComments(website as string);

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
  const [userProfile] = useSession();

  const router = useRouter();
  const website = router.query.website as string;
  const height = (router.query.h as string) ?? '250';

  const [comments, addComment] = useComments(props.comments, website);

  const loginHrefWithRedirect = loginHref();
  const registerHrefWithRedirect = registerHref();

  return (
    <div className="w-full p-3" style={{ height: height + 'px' }}>
      <CommentsContainer
        userProfile={userProfile}
        comments={comments}
        className="max-h-full"
        iframe={true}
        loginHref={loginHrefWithRedirect}
        registerHref={registerHrefWithRedirect}
        onSubmit={addComment}
        onLogout={logout}
      />
    </div>
  );
};
export default Index;
