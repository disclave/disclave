import React from 'react';
import { useTranslation, Trans } from 'next-i18next';
import { Button } from '@disclave/ui';
import Link from 'next/link';
import { cookiePolicyHref } from '@/pages/cookie-policy';

export const CookieBanner: React.VFC = () => {
  const { t } = useTranslation('layout');

  const CookieLink: React.FC = ({ children }) => (
    <Link href={cookiePolicyHref()}>
      <a className="text-primary hover:underline">{children}</a>
    </Link>
  );

  const onBtnClick = () => {};

  return (
    <div className="fixed bottom-0 w-screen bg-white bg-opacity-90 p-3 shadow border-t-2">
      <div className="mx-auto w-max max-w-full flex flex-col lg:flex-row items-center">
        <div>
          <Trans t={t} i18nKey="cookie banner.information with link">
            Information with <CookieLink>link</CookieLink>
          </Trans>
        </div>
        <div className="mx-4 my-2">
          <Button outlined onClick={onBtnClick}>
            {t('cookie banner.confirm btn')}
          </Button>
        </div>
      </div>
    </div>
  );
};
