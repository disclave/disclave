const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  target: 'server',
  env: {
    FIREBASE_CLIENT_CONFIG: process.env.FIREBASE_CLIENT_CONFIG
  }
};
