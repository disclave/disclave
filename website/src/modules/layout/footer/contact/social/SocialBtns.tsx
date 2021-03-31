import React from 'react';
import { SocialBtn } from '@/modules/social/btn';
import { Type } from '@/modules/social/btn/SocialBtn';
import {
  disclaveFacebook,
  disclaveGithub,
  disclaveMessenger,
  disclaveReddit,
  disclaveTwitter
} from '@/consts';
import { useTranslation } from 'next-i18next';

export const SocialBtns: React.VFC = () => {
  const { t } = useTranslation('layout');

  return (
    <div className="flex flex-row space-x-2">
      <SocialBtn
        type={Type.FACEBOOK}
        href={disclaveFacebook}
        title={t('footer.contact.social.facebook')}
      />
      <SocialBtn
        type={Type.MESSENGER}
        href={disclaveMessenger}
        title={t('footer.contact.social.messenger')}
      />
      <SocialBtn
        type={Type.GITHUB}
        href={disclaveGithub}
        title={t('footer.contact.social.github')}
      />
      <SocialBtn
        type={Type.TWITTER}
        href={disclaveTwitter}
        title={t('footer.contact.social.twitter')}
      />
      <SocialBtn
        type={Type.REDDIT}
        href={disclaveReddit}
        title={t('footer.contact.social.reddit')}
      />
    </div>
  );
};
