import React from 'react';
import { Layout } from '@/modules/layout';
import { MainSection } from './main';
import { CommentsRankingsSection } from '@/modules/pages/home/comments-rankings';
import { CommentModel } from '@disclave/client';

export interface HomePageProps {
  topComments: Array<CommentModel>;
  latestComments: Array<CommentModel>;
}

export const HomePage: React.VFC<HomePageProps> = (props) => {
  return (
    <Layout>
      <MainSection />
      <CommentsRankingsSection
        topComments={props.topComments}
        latestComments={props.latestComments}
      />
    </Layout>
  );
};
