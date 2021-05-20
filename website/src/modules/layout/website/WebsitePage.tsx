import React from 'react';
import { Layout } from '@/modules/layout';
import { CommentModel } from '@disclave/client';
import { WebsiteInfo } from './info';
import { WebsiteComments } from './comments';
import { loginHref } from '@/pages/auth/login';
import { websiteHrefRaw } from '@/pages/website/[website]';
import { registerHref } from '@/pages/auth/register';
import { PageDetails } from './info/PageDetails';

export interface WebsitePageProps {
  website: string;
  pageDetails: PageDetails;
  comments: Array<CommentModel>;
}

export const WebsitePage: React.VFC<WebsitePageProps> = ({ website, pageDetails, comments }) => {
  const loginHrefWithRedirect = loginHref(websiteHrefRaw, website);
  const registerHrefWithRedirect = registerHref(websiteHrefRaw, website);

  return (
    <Layout loginHref={loginHrefWithRedirect} registerHref={registerHrefWithRedirect}>
      <div className="mx-4 mt-4">
        <WebsiteInfo pageDetails={pageDetails} />
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
