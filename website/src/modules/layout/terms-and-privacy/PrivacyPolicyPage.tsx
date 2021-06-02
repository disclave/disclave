import React from 'react';
import { Layout } from '../_layout';
import { PrivacyPolicyText } from './privacy-policy';

export const PrivacyPolicyPage: React.VFC = () => {
  return (
    <Layout>
      <section className="container mx-auto max-w-3xl py-8 px-4">
        <PrivacyPolicyText />
      </section>
    </Layout>
  );
};
