import React from 'react';
import { useRouter } from 'next/router';
import { loginHref } from '@/pages/auth/login';
import { registerHref } from '@/pages/auth/register';
import { Button } from '@disclave/ui';
import { useTranslation } from 'next-i18next';
import { signIn, signOut, useSession } from 'next-auth/client';

export interface NotAuthenticatedProps {
  loginHref: string;
  registerHref: string;
}

export const NotAuthenticated: React.VFC<NotAuthenticatedProps> = (props) => {
  const { t } = useTranslation('layout');
  const router = useRouter();

  // TODO
  // const loginBtnHref = '/api/auth/login';
  // const loginBtnHref = props.loginHref ?? loginHref(router.route);
  const registerBtnHref = props.registerHref ?? registerHref(router.route);

  return (
    <div className="flex flex-row space-x-2 justify-end">
      {/*<Button href={loginBtnHref} outlined>*/}
      {/*  {t('header.auth.buttons.log in')}*/}
      {/*</Button>*/}
      <Button onClick={() => signIn()} outlined>
        {t('header.auth.buttons.log in')}
      </Button>
      <Button href={registerBtnHref}>{t('header.auth.buttons.sign up')}</Button>
    </div>
  );
};
