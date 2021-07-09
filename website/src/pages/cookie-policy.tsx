import { CookiePolicyPage } from '@/modules/layout/terms-and-privacy';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const cookiePolicyHref = () => '/cookie-policy';

const CookiePolicy: React.VFC = () => {
  return <CookiePolicyPage />;
};
export default CookiePolicy;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'layout']))
  }
});
