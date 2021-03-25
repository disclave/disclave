import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentsContainer } from '@webchat/ui';
import { loginHref } from '../../auth/login';
import { CommentModel, useSession } from '@webchat/client';
import { registerHref } from '../../auth/register';
import { useComments } from '../../../modules/comments';
import { getCommentService, init } from '@webchat/server';

export const websiteIframeHref = (url: string) => `/website/${url}/iframe/`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  init(JSON.parse(process.env.FIREBASE_CERT));
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
  const [, , isActiveAccount] = useSession();

  const router = useRouter();
  const website = router.query.website as string;

  const [comments, addComment] = useComments(props.comments, website);

  // TODO: open links in popup/modal window
  const loginHrefWithRedirect = loginHref();
  const registerHrefWithRedirect = registerHref();

  return (
    <div className="w-full h-full p-3">
      <CommentsContainer
        authenticated={isActiveAccount}
        comments={comments}
        className="max-h-full"
        iframe={true}
        loginHref={loginHrefWithRedirect}
        registerHref={registerHrefWithRedirect}
        onSubmit={addComment}
      />
    </div>
  );
};
export default Index;
