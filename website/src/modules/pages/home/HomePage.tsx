import React from 'react';
import { Layout } from '@/modules/layout';
import { MainSection } from './main';
import { CommentModel } from '@disclave/client';
import { LatestCommentsSection, TopCommentsSection } from '@/modules/pages/home/comments-preview';
import { PluginsSection } from '@/modules/pages/home/plugins';
import { ExtensionsSection } from '@/modules/pages/home/extensions';

export interface HomePageProps {
  commentsLimit: number;
  topComments: Array<CommentModel>;
  topMinVoteSum: number;
  latestComments: Array<CommentModel>;
  latestMinVoteSum: number;
}

export const HomePage: React.VFC<HomePageProps> = (props) => {
  return (
    <Layout>
      <MainSection />

      <div
        style={{
          background: "url('/images/home/bg_1.jpg') no-repeat center top",
          backgroundSize: 'cover'
        }}>
        <div className="container mx-auto py-8 flex flex-col lg:flex-row">
          <TopCommentsSection
            className="lg:w-1/2 p-4"
            commentsLimit={props.commentsLimit}
            comments={props.topComments}
            minVoteSum={props.topMinVoteSum}
          />

          <PluginsSection className="lg:w-1/2 p-4" />
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#f7f5f8'
        }}>
        <div className="container mx-auto py-8 flex flex-col lg:flex-row">
          <LatestCommentsSection
            className="lg:w-1/2 lg:order-2 p-4"
            commentsLimit={props.commentsLimit}
            comments={props.latestComments}
            minVoteSum={props.latestMinVoteSum}
          />

          <ExtensionsSection className="lg:w-1/2 lg:order-1 p-4" />
        </div>
      </div>
    </Layout>
  );
};
