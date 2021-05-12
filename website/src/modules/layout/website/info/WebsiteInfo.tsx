import React from 'react';
import { stringToUrl } from '@disclave/client';
import { useTranslation } from 'next-i18next';

export interface WebsiteInfoProps {
  website: string;
}

export const WebsiteInfo: React.VFC<WebsiteInfoProps> = (props) => {
  const { t } = useTranslation('website');

  const websiteURL = stringToUrl(props.website);
  const url = new URL(websiteURL);

  return (
    <section className="container mx-auto">
      <div>
        <div className="text-2xl font-bold break-words">{url.host}</div>
        <div className="text-lg font-semibold break-words">{url.pathname}</div>
        <div className="mt-2">
          <a
            href={websiteURL}
            className="text-primary text-xs hover:text-primary-dark hover:underline break-words"
            target="_blank"
            rel="nofollow noopener">
            {t('info.visit', { url: websiteURL })}
          </a>
        </div>
      </div>
    </section>
  );
};
