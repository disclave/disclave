import { valuesToParamsArray } from '@/modules/redirect';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RegisterPage } from '@/modules/layout/auth/register';
import { NextSeo } from 'next-seo';
import { domain } from '@/consts';

export const registerHref = (redirectPath?: string, redirectPathParamToEncode?: string): string => {
  let path = '/auth/register';

  const params = valuesToParamsArray(redirectPath, redirectPathParamToEncode);
  if (params.length) path += '?' + params.join('&');

  return path;
};

const Register = () => {
  return (
    <>
      <NextSeo canonical={domain + registerHref()} />
      <RegisterPage />
    </>
  );
};
export default Register;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
