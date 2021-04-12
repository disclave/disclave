import React from 'react';
import { Layout } from '@/modules/layout';
import { MainSection } from './main';
import { CommentsRankingsSection } from '@/modules/pages/home/comments-rankings';
import { CommentModel } from '@disclave/client';

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
      <CommentsRankingsSection
        commentsLimit={props.commentsLimit}
        topComments={props.topComments}
        topMinVoteSum={props.topMinVoteSum}
        latestComments={props.latestComments}
        latestMinVoteSum={props.latestMinVoteSum}
        serverSideUid={props.serverSideUid}
      />
    </Layout>
  );
};
