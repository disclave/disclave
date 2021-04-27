const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  target: 'server',
  env: {
    DOMAIN: process.env.DOMAIN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    FIREBASE_CLIENT_CONFIG: process.env.FIREBASE_CLIENT_CONFIG
  },
  future: {
    webpack5: true
  }
};
