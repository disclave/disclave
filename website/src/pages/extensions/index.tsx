import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { ExtensionsPage } from '@/modules/layout/extensions';
import { GetStaticProps } from 'next';

export const extensionsHref = () => '/extensions';

const Extensions: React.VFC = () => {
  return <ExtensionsPage />;
};
export default Extensions;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'layout', 'extensions']))
  }
});
