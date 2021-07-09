import { PrivacyPolicyPage } from '@/modules/layout/terms-and-privacy';
import { PageUrl } from '@/PageUrl';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const privacyPolicyHref: PageUrl = () => '/privacy-policy';

const PrivacyPolicy: React.VFC = () => {
  return <PrivacyPolicyPage />;
};
export default PrivacyPolicy;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'layout']))
  }
});
