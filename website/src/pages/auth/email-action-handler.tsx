import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { EmailActionHandlerPage } from '@/modules/layout/auth/email-action-handler/EmailActionHandlerPage';
import { GetStaticProps } from 'next';

const EmailActionHandler: React.VFC = () => {
  return <EmailActionHandlerPage />;
};
export default EmailActionHandler;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['auth', 'common', 'layout']))
  }
});
