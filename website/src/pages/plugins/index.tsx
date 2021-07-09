import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { PluginsPage } from '@/modules/layout/plugins';
import { PageUrl } from '@/PageUrl';
import { GetStaticProps } from 'next';

export const pluginsHref: PageUrl = () => '/plugins';

const Plugins: React.VFC = () => {
  return <PluginsPage />;
};
export default Plugins;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout', 'plugins']))
  }
});
