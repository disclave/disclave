import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { MobilePage } from '@/modules/layout/mobile';

export const mobileHref = () => '/mobile';

const Plugins: React.VFC = () => {
  return <MobilePage />;
};
export default Plugins;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout', 'mobile']))
  }
});
