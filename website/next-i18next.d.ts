import 'react-i18next';

import auth from './public/locales/en/auth.json';
import common from './public/locales/en/common.json';
import nav from './public/locales/en/nav.json';

declare module 'react-i18next' {
  interface Resources {
    auth: typeof auth;
    common: typeof common;
    nav: typeof nav;
  }
}
