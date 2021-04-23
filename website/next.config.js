const { i18n } = require('./next-i18next.config');

const getDomain = () => {
  let domain = process.env.DOMAIN;
  if (!domain) return domain;

  return domain.replace('${HEROKU_APP_NAME}', process.env.HEROKU_APP_NAME);
};

module.exports = {
  i18n,
  target: 'server',
  env: {
    DOMAIN: getDomain(),
    NEXTAUTH_URL: getDomain(),
    FIREBASE_CLIENT_CONFIG: process.env.FIREBASE_CLIENT_CONFIG
  },
  future: {
    webpack5: true
  }
};
