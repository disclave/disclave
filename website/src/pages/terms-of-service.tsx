import { TermsOfServicePage } from '@/modules/layout/terms-and-privacy';
import { PageUrl } from '@/PageUrl';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const termsOfServiceHref: PageUrl = () => '/terms-of-service';

const TermsOfService: React.VFC = () => {
  return <TermsOfServicePage />;
};
export default TermsOfService;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
