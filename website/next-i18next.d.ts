import 'react-i18next';

import common from './public/locales/en/common.json';
import layout from './public/locales/en/layout.json';

declare module 'react-i18next' {
  interface Resources {
    common: typeof common;
    layout: typeof layout;
  }
}
