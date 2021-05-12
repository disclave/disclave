import React from 'react';
import { Button } from '@disclave/ui';
import { pluginsHref } from '@/pages/plugins';
import { useTranslation } from 'next-i18next';

export interface PluginsSectionProps {
  className?: string;
}

export const PluginsSection: React.VFC<PluginsSectionProps> = (props) => {
  const { t } = useTranslation(['home']);
  
  return (
    <section className={props.className}>
      <h2 className="text-3xl font-semibold">{t('plugins.title')}</h2>
      <p className="py-8">{t('plugins.text')}</p>
      <Button href={pluginsHref()} outlined>{t('plugins.btn')}</Button>
      <div className="pt-8">
        <img src="/images/home/plugins/1.svg" alt="" width={765} height={484} />
      </div>
    </section>
  );
};
