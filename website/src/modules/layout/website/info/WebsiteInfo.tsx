import React from 'react';
import { PageDetailsModel, stringToUrl } from '@disclave/client';
import { useTranslation } from 'next-i18next';

export interface WebsiteInfoProps {
  pageDetails: PageDetailsModel;
}

export const WebsiteInfo: React.VFC<WebsiteInfoProps> = ({ pageDetails }) => {
  const { t } = useTranslation('website');

  const url = new URL(pageDetails.url);

  return (
    <section className="container mx-auto">
      <div>
        <div className="text-2xl font-bold break-words">{url.host}</div>
        <div className="text-lg font-semibold break-words">{url.pathname}</div>
        <div className="mt-2">
          <a
            href={pageDetails.url}
            className="text-primary text-xs hover:text-primary-dark hover:underline break-words"
            target="_blank"
            rel="nofollow noopener">
            {t('info.visit', { url: pageDetails.url })}
          </a>
        </div>
      </div>
    </section>
  );
};
