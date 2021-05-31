import React from 'react';
import { Layout } from '../_layout';
import { AcceptableUsePolicyText } from './acceptable-use-policy';

export const AcceptableUsePolicyPage: React.VFC = () => {
  return (
    <Layout>
      <section className="container mx-auto max-w-3xl py-8 px-4">
        <AcceptableUsePolicyText />
      </section>
    </Layout>
  );
};
