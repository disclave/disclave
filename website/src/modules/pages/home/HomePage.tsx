import React from 'react';
import { Layout } from '@/modules/layout';
import { MainSection } from './main';
import { CommentModel } from '@disclave/client';
import { LatestCommentsSection, TopCommentsSection } from '@/modules/pages/home/comments-preview';

export interface HomePageProps {
  commentsLimit: number;
  topComments: Array<CommentModel>;
  topMinVoteSum: number;
  latestComments: Array<CommentModel>;
  latestMinVoteSum: number;
  serverSideUid: string | null;
}

export const HomePage: React.VFC<HomePageProps> = (props) => {
  return (
    <Layout>
      <MainSection />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-4 gap-8">
          <TopCommentsSection
            commentsLimit={props.commentsLimit}
            comments={props.topComments}
            minVoteSum={props.topMinVoteSum}
            serverSideUid={props.serverSideUid}
          />
          <LatestCommentsSection
            commentsLimit={props.commentsLimit}
            comments={props.latestComments}
            minVoteSum={props.latestMinVoteSum}
            serverSideUid={props.serverSideUid}
          />
        </div>
      </div>
    </Layout>
  );
};
