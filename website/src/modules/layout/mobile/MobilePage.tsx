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
      <section className="container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl pb-4">{t('main.header')}</h1>
          <p className="whitespace-pre-line">{t('main.text')}</p>
        </div>

        <div className="mt-6 max-w-4xl mx-auto">
          <h2 className="text-2xl pb-4">{t('usage.title')}</h2>

          <p className="pb-6">{t('usage.intro')}</p>
        </div>

        <StoryTimeline />

        <div className="mt-16 max-w-4xl mx-auto">
          <p className="pb-2">{t('pwa.info')}</p>

          <Link href={pwaWebsite}>
            <a className="text-primary hover:underline" target="_blank" rel="noopener">
              {t('pwa.learn more')}
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
};
