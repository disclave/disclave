import React from 'react';
import { Layout } from '@/modules/layout';
import { CommentModel, logout, useSession } from '@disclave/client';
import { CommentsContainer } from '@disclave/ui';
import { useComments } from '@/modules/comments';
import { loginHref } from '@/pages/auth/login';
import { registerHref } from '@/pages/auth/register';
import { websiteHrefRaw } from '@/pages/website/[website]';
import { WebsiteInfo } from '@/modules/website/info';

export interface WebsitePageProps {
  website: string;
  comments: Array<CommentModel>;
}

export const WebsitePage: React.VFC<WebsitePageProps> = (props) => {
  const [userProfile] = useSession();

  const website = props.website;
  const [comments, addComment] = useComments(props.comments, website);

  const loginHrefWithRedirect = loginHref(websiteHrefRaw, website);
  const registerHrefWithRedirect = registerHref(websiteHrefRaw, website);

  return (
    <Layout>
      <div className="mx-4 mt-4">
        <WebsiteInfo website={website} />
        <div className="p-3">
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
      </div>
    </Layout>
  );
};
