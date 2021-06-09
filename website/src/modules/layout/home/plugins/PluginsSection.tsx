import React from 'react';
import { Button } from '@disclave/ui';
import { pluginsHref } from '@/pages/plugins';
import { useTranslation } from 'next-i18next';
import { SectionHeader } from '../components';

export interface PluginsSectionProps {
  className?: string;
}

export const PluginsSection: React.VFC<PluginsSectionProps> = (props) => {
  const { t } = useTranslation('home');
  
  return (
    <section className={props.className}>
      <SectionHeader>{t('plugins.title')}</SectionHeader>
      <p className="py-8">{t('plugins.text')}</p>
      <Button href={pluginsHref()} outlined>{t('plugins.btn')}</Button>
      <div className="pt-8">
        <img src="/images/home/plugins/1.svg" alt="" width={765} height={484} />
      </div>
    </section>
  );
};
