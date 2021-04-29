import { valuesToParamsArray } from '@/modules/redirect';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { LoginPage } from '@/modules/pages/auth/login';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getUserCookie } from '@disclave/server';

export const loginHref = (redirectPath?: string, redirectPathParamToEncode?: string): string => {
  let path = '/auth/login';

  const params = valuesToParamsArray(redirectPath, redirectPathParamToEncode);
  if (params.length) path += '?' + params.join('&');

  return path;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await initServer();

  const userCookie = getUserCookie(context.req);
  const translationsPromise = serverSideTranslations(context.locale, ['common', 'layout']);

  return {
    props: {
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

const Login = () => {
  return <LoginPage />;
};
export default Login;
