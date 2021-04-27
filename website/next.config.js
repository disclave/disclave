const { i18n } = require('./next-i18next.config');

const getDomain = () => replaceHerokuAppName(process.env.DOMAIN);
const getNextAuthUrl = () => replaceHerokuAppName(process.env.NEXTAUTH_URL);
const replaceHerokuAppName = (url) => {
  if (!url) return url;
  return url.replace('${HEROKU_APP_NAME}', process.env.HEROKU_APP_NAME);
};

module.exports = {
  i18n,
  target: 'server',
  env: {
    DOMAIN: getDomain(),
    NEXTAUTH_URL: getNextAuthUrl(),
    FIREBASE_CLIENT_CONFIG: process.env.FIREBASE_CLIENT_CONFIG
  },
  future: {
    webpack5: true
  }
};
