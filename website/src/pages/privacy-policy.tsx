import { PrivacyPolicyPage } from '@/modules/layout/terms-and-privacy';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const privacyPolicyHref = () => '/privacy-policy';

const PrivacyPolicy = () => {
  return <PrivacyPolicyPage />;
};
export default PrivacyPolicy;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
