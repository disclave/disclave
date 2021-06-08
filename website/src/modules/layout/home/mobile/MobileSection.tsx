import React from 'react';
import { Button } from '@disclave/ui';
import { useTranslation } from 'next-i18next';
import { SectionHeader } from '../components';
import { mobileHref } from '@/pages/mobile';

export interface MobileSectionProps {
  className?: string;
}

export const MobileSection: React.VFC<MobileSectionProps> = (props) => {
  const { t } = useTranslation('home');

  return (
    <section className={props.className}>
      <SectionHeader>{t('mobile.title')}</SectionHeader>
      <p className="py-8">{t('mobile.text')}</p>
      <Button href={mobileHref()} outlined>{t('mobile.btn')}</Button>
      <div className="pt-8">
        <img src="/images/home/mobile/1.svg" alt="" width={1097} height={806} />
      </div>
    </section>
  );
};
