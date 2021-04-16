import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { PluginsPage } from '@/modules/pages/plugins';
import { SessionProvider } from '@disclave/client';

export const pluginsHref = () => '/plugins';

const Plugins: React.VFC = () => {
  return (
    <SessionProvider>
      <PluginsPage />
    </SessionProvider>
  );
};
export default Plugins;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout', 'plugins']))
  }
});
