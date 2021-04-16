import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { EmailActionHandlerPage } from '@/modules/pages/auth/email-action-handler/EmailActionHandlerPage';
import React from 'react';

const EmailActionHandler = () => {
  return <EmailActionHandlerPage />;
};
export default EmailActionHandler;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['auth', 'common', 'layout']))
  }
});
