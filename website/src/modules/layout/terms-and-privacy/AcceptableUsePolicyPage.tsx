import React from 'react';
import { Layout } from '../_layout';
import { AcceptableUsePolicyText } from './acceptable-use-policy';

export const AcceptableUsePolicyPage: React.VFC = () => {
  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <AcceptableUsePolicyText />
        </div>
      </section>
    </Layout>
  );
};
