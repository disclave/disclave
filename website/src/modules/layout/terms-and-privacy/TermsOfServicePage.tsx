import React from 'react';
import { Layout } from '../_layout';
import { TermsOfServiceText } from './terms-of-service';

export const TermsOfServicePage: React.VFC = () => {
  return (
    <Layout>
      <section className="container mx-auto max-w-3xl py-8 px-4">
        <TermsOfServiceText />
      </section>
    </Layout>
  );
};
