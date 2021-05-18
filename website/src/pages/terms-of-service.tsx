import { TermsOfServicePage } from '@/modules/layout/terms-and-privacy';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const termsOfServiceHref = () => '/terms-of-service';

const TermsOfService = () => {
  return <TermsOfServicePage />;
};
export default TermsOfService;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
