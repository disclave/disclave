import React from 'react';
import { Layout } from '@/modules/layout';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { pwaWebsite } from '@/consts';
import { StoryTimeline } from './usage';

export const MobilePage: React.VFC = () => {
  const { t } = useTranslation('mobile');

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <div>
            <h1 className="text-3xl pb-4">{t('main.header')}</h1>
            <p className="whitespace-pre-line">{t('main.text')}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl pb-4">{t('usage.title')}</h2>

            <p className="pb-6">{t('usage.intro')}</p>

            <StoryTimeline/>
          </div>

          <div className="mt-16">
            <p className="pb-2">{t('pwa.info')}</p>

            <Link href={pwaWebsite}>
              <a className="text-primary hover:underline" target="_blank" rel="noopener">
                {t('pwa.learn more')}
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};
