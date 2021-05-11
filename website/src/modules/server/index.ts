import { init } from '@disclave/server';

export const initServer = async () => {
  const firebaseCert = JSON.parse(process.env.FIREBASE_CERT);

  const dbConfig = {
    dbUri: process.env.DB_URI,
    dbName: process.env.DB_NAME
  };

  const mailjetConfig = {
    apiKey: process.env.MJ_API_KEY,
    apiSecret: process.env.MJ_API_SECRET,
    templates: {
      emailVerification: Number(process.env.MJ_TEMPLATE_EMAIL_VERIFICATION)
    }
  };

  await init(firebaseCert, dbConfig, mailjetConfig);
};
