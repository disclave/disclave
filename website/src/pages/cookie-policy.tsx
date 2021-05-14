import { CookiePolicyPage } from '@/modules/layout/terms-and-privacy';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CookiePolicy = () => {
  return <CookiePolicyPage />;
};
export default CookiePolicy;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
