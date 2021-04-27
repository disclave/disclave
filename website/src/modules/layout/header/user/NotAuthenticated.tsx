import React from 'react';
import { useRouter } from 'next/router';
import { loginHref } from '@/pages/auth/login';
import { Button } from '@disclave/ui';
import { useTranslation } from 'next-i18next';

export interface NotAuthenticatedProps {
  loginHref: string;
}

export const NotAuthenticated: React.VFC<NotAuthenticatedProps> = (props) => {
  const { t } = useTranslation('layout');
  const router = useRouter();

  // TODO: validate
  const loginBtnHref = props.loginHref ?? loginHref(router.route);

  return (
    <div className="flex flex-row space-x-2 justify-end">
      <Button href={loginBtnHref} outlined>
        {t('header.auth.buttons.log in')}
      </Button>
    </div>
  );
};
