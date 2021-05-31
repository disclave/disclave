import React from 'react';
import { Layout } from '@/modules/layout';
import { CommentModel, PageDetailsModel } from '@disclave/client';
import { WebsiteInfo } from './info';
import { WebsiteComments } from './comments';
import { loginHref } from '@/pages/auth/login';
import { websiteHrefRaw } from '@/pages/website/[website]';
import { registerHref } from '@/pages/auth/register';

export interface WebsitePageProps {
  website: string;
  pageDetails: PageDetailsModel;
  comments: Array<CommentModel>;
}

export const WebsitePage: React.VFC<WebsitePageProps> = ({ website, pageDetails, comments }) => {
  const loginHrefWithRedirect = loginHref(websiteHrefRaw, website);
  const registerHrefWithRedirect = registerHref(websiteHrefRaw, website);

  return (
    <Layout loginHref={loginHrefWithRedirect} registerHref={registerHrefWithRedirect}>
      <div className="container mx-auto max-w-3xl py-8 px-4">
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
