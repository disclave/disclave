import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { EmailActionHandlerPage } from '@/modules/pages/auth/email-action-handler/EmailActionHandlerPage';
import { SessionProvider } from '@disclave/client';
import React from 'react';

const EmailActionHandler = () => {
  return (
    <SessionProvider>
      <EmailActionHandlerPage />
    </SessionProvider>
  );
};
export default EmailActionHandler;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['auth', 'common', 'layout']))
  }
});
