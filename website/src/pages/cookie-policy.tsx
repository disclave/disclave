import { CookiePolicyPage } from '@/modules/layout/terms-and-privacy';
import { PageUrl } from '@/PageUrl';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const cookiePolicyHref: PageUrl = () => '/cookie-policy';

const CookiePolicy: React.VFC = () => {
  return <CookiePolicyPage />;
};
export default CookiePolicy;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
