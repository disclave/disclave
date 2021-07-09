import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { MobilePage } from '@/modules/layout/mobile';
import { PageUrl } from '@/PageUrl';
import { GetStaticProps } from 'next';

export const mobileHref: PageUrl = () => '/mobile';

const Plugins: React.VFC = () => {
  return <MobilePage />;
};
export default Plugins;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout', 'mobile']))
  }
});
