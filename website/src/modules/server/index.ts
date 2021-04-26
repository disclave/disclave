import { init } from '@disclave/server';

export const initServer = async () => {
  const dbConfig = {
    dbUri: process.env.DB_URI,
    dbName: process.env.DB_NAME
  };

  const mailjetConfig = {
    apiKey: process.env.MJ_API_KEY,
    apiSecret: process.env.MJ_API_SECRET,
    templates: {
      authVerificationCode: process.env.MJ_TEMPLATE_AUTH_VERIFICATION_CODE
    }
  };

  await init(dbConfig, mailjetConfig);
};
