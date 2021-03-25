import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentsContainer } from '@webchat/ui';
import { loginHref } from '../../auth/login';
import { CommentModel, useSession } from '@webchat/client';
import { registerHref } from '../../auth/register';
import { getComments, useComments } from '../../../modules/comments';
import { initServer } from '../../../modules/server';

export const websiteCommentsHref = (url: string) => websiteCommentsHrefRaw + url;
export const websiteCommentsHrefRaw = '/comments/';

export const getServerSideProps: GetServerSideProps = async (context) => {
  initServer();
  const { website } = context.query;
  const comments = await getComments(website as string);

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

  const headerHeight = '48px';

  const loginHrefWithRedirect = loginHref(websiteCommentsHrefRaw, website);
  const registerHrefWithRedirect = registerHref(websiteCommentsHrefRaw, website);

  return (
    <div>
      <main>
        <div style={{ height: headerHeight }} className="p-3">
          {website}
        </div>
        <div style={{ height: `calc(100vh - ${headerHeight})` }} className="p-3">
          <CommentsContainer
            authenticated={isActiveAccount}
            comments={comments}
            className="max-h-full"
            loginHref={loginHrefWithRedirect}
            registerHref={registerHrefWithRedirect}
            onSubmit={addComment}
          />
        </div>
      </main>
    </div>
  );
};
export default Index;
