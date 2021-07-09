import { AcceptableUsePolicyPage } from '@/modules/layout/terms-and-privacy';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const acceptableUsePolicyHref = () => '/acceptable-use-policy';

const AcceptableUsePolicy: React.VFC = () => {
  return <AcceptableUsePolicyPage />;
};
export default AcceptableUsePolicy;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'layout']))
  }
});
