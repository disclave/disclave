const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  target: 'server',
  env: {
    DOMAIN: process.env.DOMAIN,
    FIREBASE_CLIENT_CONFIG: process.env.FIREBASE_CLIENT_CONFIG
  },
  future: {
    webpack5: true
  }
};
