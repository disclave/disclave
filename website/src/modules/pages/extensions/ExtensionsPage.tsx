import React from 'react';
import { Layout } from '@/modules/layout';
import { ItemTile } from '@/modules/ui';
import { chromeExtensionHref } from '@/consts';
import { useTranslation } from 'next-i18next';

export const ExtensionsPage: React.VFC = () => {
  const { t } = useTranslation('extensions');

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <div>
            <h1 className="text-3xl pb-4">{t('main.header')}</h1>
            <p className="whitespace-pre-line">{t('main.text')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center my-6">
            <ItemTile
              href={chromeExtensionHref}
              name={t('extensions list.chrome.name')}
              logoSrc="/images/extensions/chrome-logo.png"
            />
            <ItemTile name={t('extensions list.more soon')} />
          </div>
          <div>
            <p>{t('extensions list.not found.text')}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
