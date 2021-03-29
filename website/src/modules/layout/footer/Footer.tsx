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

export interface FooterProps {}

export const Footer: React.VFC<FooterProps> = (props) => {
  return (
    <footer className="bg-gray-900 text-white px-8">
      <div className="container mx-auto pt-20 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          <div className="lg:col-span-5">Menu</div>
          <div className="lg:col-span-2 sm:justify-self-end">
            Find us:
            <div className="flex flex-row space-x-2">
              <SocialBtn type={Type.FACEBOOK} href={disclaveFacebook} />
              <SocialBtn type={Type.MESSENGER} href={disclaveMessenger} />
              <SocialBtn type={Type.GITHUB} href={disclaveGithub} />
              <SocialBtn type={Type.TWITTER} href={disclaveTwitter} />
              <SocialBtn type={Type.REDDIT} href={disclaveReddit} />
            </div>
          </div>
        </div>
        <div className="pt-8 text-gray-400 text-sm">© 2021 by Disclave</div>
      </div>
    </footer>
  );
};
