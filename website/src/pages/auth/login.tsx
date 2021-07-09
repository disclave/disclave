import { valuesToParamsArray } from '@/modules/redirect';
import { LoginPage } from '@/modules/layout/auth/login';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { domain } from '@/consts';
import { PageUrl } from '@/PageUrl';
import { GetStaticProps } from 'next';

export const loginHref: PageUrl = (
  redirectPath?: string,
  redirectPathParamToEncode?: string
): string => {
  let path = '/auth/login';

  const params = valuesToParamsArray(redirectPath, redirectPathParamToEncode);
  if (params.length) path += '?' + params.join('&');

  return path;
};

const Login: React.VFC = () => {
  return (
    <>
      <NextSeo canonical={domain + loginHref()} />
      <LoginPage />
    </>
  );
};
export default Login;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
