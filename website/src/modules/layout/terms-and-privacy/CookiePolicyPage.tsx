import React from 'react';
import { Layout } from '../_layout';
import { CookiePolicyText } from './cookie-policy';

export const CookiePolicyPage: React.VFC = () => {
  return (
    <Layout>
      <section className="container mx-auto max-w-3xl py-8 px-4">
        <CookiePolicyText />
      </section>
    </Layout>
  );
};
