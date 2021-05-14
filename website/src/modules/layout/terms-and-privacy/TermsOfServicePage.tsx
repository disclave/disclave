import React from 'react';
import { Layout } from '../_layout';
import { TermsOfServiceText } from './terms-of-service';

export const TermsOfServicePage: React.VFC = () => {
  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <TermsOfServiceText />
        </div>
      </section>
    </Layout>
  );
};
