import 'react-i18next';

import auth from './public/locales/en/auth.json';
import comments from './public/locales/en/comments.json';
import common from './public/locales/en/common.json';
import home from './public/locales/en/home.json';
import layout from './public/locales/en/layout.json';
import website from './public/locales/en/website.json';

declare module 'react-i18next' {
  interface Resources {
    auth: typeof auth;
    comments: typeof comments;
    common: typeof common;
    home: typeof home;
    layout: typeof layout;
    website: typeof website;
  }
}
