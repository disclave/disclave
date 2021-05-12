import React from 'react';
import { Button } from '@disclave/ui';
import { extensionsHref } from '@/pages/extensions';
import { useTranslation } from 'next-i18next';
import { SectionHeader } from '../components';

export interface ExtensionsSectionProps {
  className?: string;
}

export const ExtensionsSection: React.VFC<ExtensionsSectionProps> = (props) => {
  const { t } = useTranslation(['home']);

  return (
    <section className={props.className}>
      <SectionHeader>{t('extensions.title')}</SectionHeader>
      <p className="py-8">{t('extensions.text')}</p>
      <Button href={extensionsHref()} outlined>{t('extensions.btn')}</Button>
      <div className="pt-8">
        <img src="/images/home/extensions/1.svg" alt="" width={1061} height={531} />
      </div>
    </section>
  );
};
