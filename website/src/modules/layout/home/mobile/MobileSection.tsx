import React from 'react';
import { Button } from '@disclave/ui';
import { useTranslation } from 'next-i18next';
import { SectionHeader } from '../components';
import { mobileHref } from '@/pages/mobile';

export interface MobileSectionProps {
  className?: string;
}

export const MobileSection: React.VFC<MobileSectionProps> = (props) => {
  const { t } = useTranslation(['home']);

  return (
    <section className={props.className}>
      <SectionHeader>TODO</SectionHeader>
      <p className="py-8">TODO</p>
      <Button href={mobileHref()} outlined>TODO</Button>
      <div className="pt-8">
        TODO image
        {/* <img src="/images/home/extensions/1.svg" alt="" width={1061} height={531} /> */}
      </div>
    </section>
  );
};
