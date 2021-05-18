import { AcceptableUsePolicyPage } from '@/modules/layout/terms-and-privacy';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const acceptableUsePolicyHref = () => '/acceptable-use-policy';

const AcceptableUsePolicy = () => {
  return <AcceptableUsePolicyPage />;
};
export default AcceptableUsePolicy;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
