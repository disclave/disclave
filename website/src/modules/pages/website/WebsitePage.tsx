import React from 'react';
import { Layout } from '@/modules/layout';
import { CommentModel } from '@disclave/client';
import { WebsiteInfo } from './info';
import { WebsiteComments } from './comments';
import { loginHref } from '@/pages/auth/login';
import { websiteHrefRaw } from '@/pages/website/[website]';
import { registerHref } from '@/pages/auth/register';

export interface WebsitePageProps {
  website: string;
  comments: Array<CommentModel>;
}

export const WebsitePage: React.VFC<WebsitePageProps> = ({ website, comments }) => {
  const loginHrefWithRedirect = loginHref(websiteHrefRaw, website);
  // TODO: remove register flow
  const registerHrefWithRedirect = registerHref(websiteHrefRaw, website);

  return (
    <Layout loginHref={loginHrefWithRedirect}>
      <div className="mx-4 mt-4">
        <WebsiteInfo website={website} />
        <WebsiteComments
          website={website}
          comments={comments}
          loginHref={loginHrefWithRedirect}
          registerHref={registerHrefWithRedirect}
        />
      </div>
    </Layout>
  );
};
