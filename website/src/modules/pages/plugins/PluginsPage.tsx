import React from 'react';
import { Layout } from '@/modules/layout';
import { PluginTile } from '@/modules/plugins';
import { reactPluginHref } from '@/consts';
import { DisclaveComments } from '@disclave/react-plugin';
import { useTranslation } from 'next-i18next';

export const PluginsPage: React.VFC = () => {
  const { t } = useTranslation('plugins');

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <div>
            <h1 className="text-3xl pb-4">{t('main.header')}</h1>
            <p className="whitespace-pre-line">{t('main.text')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center my-6">
            <PluginTile
              href={reactPluginHref}
              name={t('plugins list.react.name')}
              logoSrc="/images/plugins/react-logo.png"
            />
            <PluginTile name={t('plugins list.more soon')} />
          </div>
          <div>
            <p>{t('plugins list.not found.text')}</p>
          </div>
          <div>
            <h3 className="text-xl py-4">{t('example.header')}</h3>
            <p>{t('example.text')}</p>
            <div>
              <DisclaveComments />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
