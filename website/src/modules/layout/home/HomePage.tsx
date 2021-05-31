import React from 'react';
import { Layout } from '@/modules/layout';
import { MainSection } from './main';
import { CommentModel, PageModel } from '@disclave/client';
import { LatestCommentsSection, TopCommentsSection } from '@/modules/layout/home/comments-preview';
import { PluginsSection } from '@/modules/layout/home/plugins';
import { ExtensionsSection } from '@/modules/layout/home/extensions';
import { TopCommentedPagesSection } from './pages-preview';
import { MobileSection } from './mobile';

export interface HomePageProps {
  topComments: {
    comments: Array<CommentModel>;
    limit: number;
    minVoteSum: number;
  };
  topCommentedPages: {
    pages: Array<PageModel>;
    limit: number;
    minCommentsVoteSum: number;
  };
  latestComments: {
    comments: Array<CommentModel>;
    limit: number;
    minVoteSum: number;
  };
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
            commentsLimit={props.topComments.limit}
            comments={props.topComments.comments}
            minVoteSum={props.topComments.minVoteSum}
          />

          <div className="lg:w-1/2 p-4">Blog preview</div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#f7f5f8'
        }}>
        <div className="container mx-auto py-8 flex flex-col lg:flex-row">
          <TopCommentedPagesSection
            className="lg:w-1/2 lg:order-2 p-4"
            pages={props.topCommentedPages.pages}
            pagesLimit={props.topCommentedPages.limit}
            minCommentsVoteSum={props.topCommentedPages.minCommentsVoteSum}
          />

          <ExtensionsSection className="lg:w-1/2 lg:order-1 p-4" />
        </div>
      </div>

      <div
        style={{
          background: "url('/images/home/bg-2.svg') no-repeat center bottom"
        }}>
        <div className="container mx-auto py-8 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-4">Top rated pages</div>

          <PluginsSection className="lg:w-1/2 p-4" />
        </div>
      </div>

      <div className="container mx-auto py-8 flex flex-col lg:flex-row">
        <LatestCommentsSection
          className="lg:w-1/2 lg:order-2 p-4"
          commentsLimit={props.latestComments.limit}
          comments={props.latestComments.comments}
          minVoteSum={props.latestComments.minVoteSum}
        />
        
        <MobileSection className="lg:w-1/2 lg:order-1 p-4" />
      </div>
    </Layout>
  );
};
