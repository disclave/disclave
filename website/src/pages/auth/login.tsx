import { valuesToParamsArray } from '@/modules/redirect';
import { LoginPage } from '@/modules/pages/auth/login';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export const loginHref = (redirectPath?: string, redirectPathParamToEncode?: string): string => {
  let path = '/auth/login';

  const params = valuesToParamsArray(redirectPath, redirectPathParamToEncode);
  if (params.length) path += '?' + params.join('&');

  return path;
};

const Login = () => {
  return <LoginPage />;
};
export default Login;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});