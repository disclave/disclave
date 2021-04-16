import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { PluginsPage } from '@/modules/pages/plugins';

export const pluginsHref = () => '/plugins';

const Plugins: React.VFC = () => {
  return <PluginsPage />;
};
export default Plugins;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout', 'plugins']))
  }
});
