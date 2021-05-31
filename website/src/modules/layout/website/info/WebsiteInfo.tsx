import React from 'react';
import { PageDetailsModel } from '@disclave/client';
import { useTranslation } from 'next-i18next';
import { PageVotes } from '@/modules/pages/votes';
import classNames from 'classnames';

export interface WebsiteInfoProps {
  pageDetails: PageDetailsModel;
}

export const WebsiteInfo: React.VFC<WebsiteInfoProps> = ({ pageDetails }) => {
  const { t } = useTranslation('website');

  const url = new URL(pageDetails.url);
  const logo = pageDetails.meta?.logo ?? null;
  const title = pageDetails.meta?.title ?? null;

  const hostClassName = classNames('text-lg font-bold leading-6', title ? 'truncate' : 'break-all');
  const pathClassName = classNames('text-lg leading-6 mt-1', title ? 'truncate' : 'break-all');

  const Host: React.VFC = () => (
    <div className="flex flex-row items-center overflow-auto">
      {logo ? <img src={logo} alt={url.host} width={18} height={18} className="mr-2" /> : null}
      <h1 className={hostClassName} title={url.host}>
        {url.host}
      </h1>
    </div>
  );
  const Title: React.VFC = () =>
    title ? <h2 className="text-2xl break-words my-1">{title}</h2> : null;
  const Path: React.VFC = () => (
    <h3 className={pathClassName} title={url.pathname}>
      {url.pathname}
      {url.pathname === '/' ? <span className="text-gray-400"> {t('info.main page')}</span> : null}
    </h3>
  );
  const PageLink: React.VFC = () => (
    <div className="mt-2">
      <a
        href={pageDetails.url}
        className="text-primary text-xs hover:text-primary-dark hover:underline break-all"
        target="_blank"
        rel="nofollow noopener">
        {t('info.visit', { url: pageDetails.url })}
      </a>
    </div>
  );

  return (
    <section>
      <div className="flex flex-row overflow-auto">
        <div className="pr-4 my-2">
          <PageVotes pageDetails={pageDetails} />
        </div>
        <div className="overflow-auto">
          <Host />
          <Title />
          <Path />
        </div>
      </div>
      <PageLink />
    </section>
  );
};
