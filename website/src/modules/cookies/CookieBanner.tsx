import React, { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'next-i18next';
import { Button } from '@disclave/ui';
import Link from 'next/link';
import { cookiePolicyHref } from '@/pages/cookie-policy';
import { useSession } from '@disclave/client';

const lsCookieItem = 'cookies-accepted';

export interface CookieBannerProps {
  hidden?: boolean;
}

export const CookieBanner: React.VFC<CookieBannerProps> = ({ hidden }) => {
  const { isAuthenticated, isLoading } = useSession();
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation('layout');

  useEffect(() => {
    if (hidden) return;
    if (isLoading) return;
    if (isAuthenticated || !localStorage) return;

    const val = localStorage.getItem(lsCookieItem);
    if (val != 'true') setVisible(true);
  }, [isAuthenticated, isLoading]);

  const onBtnClick = () => {
    localStorage.setItem(lsCookieItem, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  const CookieLink: React.FC = ({ children }) => (
    <Link href={cookiePolicyHref()}>
      <a className="text-primary hover:underline">{children}</a>
    </Link>
  );

  return (
    <div className="fixed bottom-0 w-screen bg-white bg-opacity-90 p-3 shadow border-t-2 z-50">
      <div className="mx-auto w-max max-w-full flex flex-col lg:flex-row items-center">
        <div>
          <Trans ns="layout" i18nKey="cookie banner.information with link">
            Information with <CookieLink>link</CookieLink>
          </Trans>
        </div>
        <div className="mx-4 my-2 lg:my-0">
          <Button outlined onClick={onBtnClick}>
            {t('cookie banner.confirm btn')}
          </Button>
        </div>
      </div>
    </div>
  );
};
