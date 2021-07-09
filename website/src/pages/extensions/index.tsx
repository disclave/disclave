import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { ExtensionsPage } from '@/modules/layout/extensions';
import { PageUrl } from '@/PageUrl';
import { GetStaticProps } from 'next';

export const extensionsHref: PageUrl = () => '/extensions';

const Extensions: React.VFC = () => {
  return <ExtensionsPage />;
};
export default Extensions;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout', 'extensions']))
  }
});
