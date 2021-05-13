import React from 'react';
import { Layout } from '@/modules/layout';
import { useTranslation } from 'next-i18next';

export const MobilePage: React.VFC = () => {
  const { t } = useTranslation('mobile');

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <h1 className="text-3xl pb-4">{t('main.header')}</h1>
          <p className="whitespace-pre-line">{t('main.text')}</p>
        </div>
      </section>
    </Layout>
  );
};