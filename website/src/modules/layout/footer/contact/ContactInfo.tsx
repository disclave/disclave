import React from 'react';
import { useTranslation } from 'next-i18next';
import { SocialBtns } from './social';

export const ContactInfo: React.VFC = () => {
  const { t } = useTranslation('layout');

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-sm text-gray-300">{t('footer.contact.find us')}</div>
      <SocialBtns />
    </div>
  );
};
