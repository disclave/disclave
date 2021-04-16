import { valuesToParamsArray } from '@/modules/redirect';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RegisterPage } from '@/modules/pages/auth/register';
import { SessionProvider } from '@disclave/client';
import React from 'react';

export const registerHref = (redirectPath?: string, redirectPathParamToEncode?: string): string => {
  let path = '/auth/register';

  const params = valuesToParamsArray(redirectPath, redirectPathParamToEncode);
  if (params.length) path += '?' + params.join('&');

  return path;
};

const Register = () => {
  return (
    <SessionProvider>
      <RegisterPage />
    </SessionProvider>
  );
};
export default Register;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
