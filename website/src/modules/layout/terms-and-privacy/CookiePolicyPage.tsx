import React from 'react';
import { Layout } from '../_layout';
import { CookiePolicyText } from './cookie-policy';

export const CookiePolicyPage: React.VFC = () => {
  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <CookiePolicyText />
        </div>
      </section>
    </Layout>
  );
};
