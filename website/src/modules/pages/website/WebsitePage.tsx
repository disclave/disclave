import React from 'react';
import { Layout } from '@/modules/layout';
import { CommentModel } from '@disclave/client';
import { WebsiteInfo } from './info';
import { WebsiteComments } from './comments';

export interface WebsitePageProps {
  website: string;
  comments: Array<CommentModel>;
}

export const WebsitePage: React.VFC<WebsitePageProps> = ({ website, comments }) => {
  return (
    <Layout>
      <div className="mx-4 mt-4">
        <WebsiteInfo website={website} />
        <WebsiteComments website={website} comments={comments} />
      </div>
    </Layout>
  );
};
