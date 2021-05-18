import React from 'react';
import { Layout } from '../_layout';
import { PrivacyPolicyText } from './privacy-policy';

export const PrivacyPolicyPage: React.VFC = () => {
  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <PrivacyPolicyText />
        </div>
      </section>
    </Layout>
  );
};
