const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  target: 'experimental-serverless-trace',
  env: {
    FIREBASE_CLIENT_CONFIG: process.env.FIREBASE_CLIENT_CONFIG
  }
};
