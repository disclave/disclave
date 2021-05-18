import React from 'react';
import { ContactInfo } from './contact';
import { useTranslation } from 'next-i18next';
import { Nav } from './nav';
import Link from 'next/link';
import { termsOfServiceHref } from '@/pages/terms-of-service';
import { privacyPolicyHref } from '@/pages/privacy-policy';
import { cookiePolicyHref } from '@/pages/cookie-policy';

export interface FooterProps {}

export const Footer: React.VFC<FooterProps> = (props) => {
  const { t } = useTranslation('layout');

  const LegalLink: React.FC<{ href: string }> = ({ children, href }) => (
    <Link href={href}>
      <a className="hover:underline">{children}</a>
    </Link>
  );

  return (
    <footer className="bg-gray-900 text-white px-8">
      <div className="container mx-auto pt-20 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          <div className="lg:col-span-5">
            <Nav />
          </div>
          <div className="lg:col-span-2 sm:justify-self-end">
            <ContactInfo />
          </div>
        </div>
        <div className="pt-8 text-gray-400 text-sm">{t('footer.copyright')}</div>
        <div className="text-gray-200">
          <LegalLink href={termsOfServiceHref()}>{t('footer.legal.terms of service')}</LegalLink>
          <span> / </span>
          <LegalLink href={privacyPolicyHref()}>{t('footer.legal.privacy policy')}</LegalLink>
          <span> / </span>
          <LegalLink href={cookiePolicyHref()}>{t('footer.legal.cookie policy')}</LegalLink>
        </div>
      </div>
    </footer>
  );
};
