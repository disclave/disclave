import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentsContainer } from '@disclave/ui';
import { loginHref } from '../../auth/login';
import { CommentModel, logout, useSession } from '@disclave/client';
import { registerHref } from '../../auth/register';
import { useComments } from '../../../modules/comments';
import { getCommentService, init } from '@disclave/server';

export const websiteHref = (url: string) => websiteHrefRaw + url;
export const websiteHrefRaw = '/website/';

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

const Website: React.FC<WebsiteProps> = (props) => {
  const [userProfile] = useSession();

  const router = useRouter();
  const website = router.query.website as string;

  const [comments, addComment] = useComments(props.comments, website);

  const headerHeight = '48px';

  const loginHrefWithRedirect = loginHref(websiteHrefRaw, website);
  const registerHrefWithRedirect = registerHref(websiteHrefRaw, website);

  return (
    <div>
      <main>
        <div style={{ height: headerHeight }} className="p-3">
          {website}
        </div>
        <div style={{ height: `calc(100vh - ${headerHeight})` }} className="p-3">
          <CommentsContainer
            userProfile={userProfile}
            comments={comments}
            className="max-h-full"
            loginHref={loginHrefWithRedirect}
            registerHref={registerHrefWithRedirect}
            onSubmit={addComment}
            onLogout={logout}
          />
        </div>
      </main>
    </div>
  );
};
export default Website;
