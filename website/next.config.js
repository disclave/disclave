module.exports = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  target: 'experimental-serverless-trace',
  env: {
    FIREBASE_CLIENT_CONFIG: process.env.FIREBASE_CLIENT_CONFIG
  }
};
