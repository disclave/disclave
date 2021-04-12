import React from 'react';
import { Layout } from '@/modules/layout';
import { MainSection } from './main';
import { CommentsRankingsSection } from '@/modules/pages/home/comments-rankings';

export const HomePage: React.VFC = () => {
  return (
    <Layout>
      <MainSection />
      <CommentsRankingsSection />
    </Layout>
  );
};
