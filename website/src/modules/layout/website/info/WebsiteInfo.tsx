import React from 'react';
import { PageDetailsModel, useSession } from '@disclave/client';
import { useTranslation } from 'next-i18next';
import { PageVotes } from '@/modules/pages/votes';

export interface WebsiteInfoProps {
  pageDetails: PageDetailsModel;
}

export const WebsiteInfo: React.VFC<WebsiteInfoProps> = ({ pageDetails }) => {
  const { t } = useTranslation('website');

  const url = new URL(pageDetails.url);
  const logo = pageDetails.meta?.logo ?? null;
  const title = pageDetails.meta?.title ?? null;

  return (
    <section className="container mx-auto flex flex-row">
      <div className="pr-4 py-2">
        <PageVotes pageDetails={pageDetails} />
      </div>
      <div>
        <div className="flex flex-row items-center">
          {logo ? (
            <div className="pr-1">
              <img src={logo} alt={url.host} width={24} height={24} />
            </div>
          ) : null}
          <h1 className="text-lg font-bold break-words">{url.host}</h1>
        </div>
        {title ? <h2 className="text-2xl break-words">{title}</h2> : null}
        <h3 className="text-lg font-semibold break-words">
          {url.pathname}
          {url.pathname === '/' ? (
            <span className="text-gray-400"> {t('info.main page')}</span>
          ) : null}
        </h3>
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
