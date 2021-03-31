import React from 'react';
import { Layout } from '@/modules/layout';
import { MainSection } from './main';

export const HomePage: React.VFC = () => {
  return (
    <Layout>
      <MainSection />
    </Layout>
  );
};
