import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export const MainSection: React.VFC = () => {
  const { t } = useTranslation('home');
  return (
    <section className="bg-secondary">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-4">
          <div>
            <div className="lg:mt-24 text-5xl font-bold">{t('main.title')}</div>
            <div className="mt-4 text-xl font-semibold">{t('main.subtitle')}</div>
          </div>
          <div className="justify-self-center">
            <Image src="/images/home/main/hero.svg" alt="" width={630} height={540} quality={100} />
          </div>
        </div>
      </div>
    </section>
  );
};
