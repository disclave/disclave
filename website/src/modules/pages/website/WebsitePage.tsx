import React from 'react';
import { Layout } from '@/modules/layout';
import { CommentModel } from '@disclave/client';
import { WebsiteInfo } from './info';
import { WebsiteComments } from './comments';
import { loginHref } from '@/pages/auth/login';
import { websiteHrefRaw } from '@/pages/website/[website]';

export interface WebsitePageProps {
  website: string;
  comments: Array<CommentModel>;
}

export const WebsitePage: React.VFC<WebsitePageProps> = ({ website, comments }) => {
  const loginHrefWithRedirect = loginHref(websiteHrefRaw, website);

  return (
    <Layout loginHref={loginHrefWithRedirect}>
      <div className="mx-4 mt-4">
        <WebsiteInfo website={website} />
        <WebsiteComments website={website} comments={comments} loginHref={loginHrefWithRedirect} />
      </div>
    </Layout>
  );
};
