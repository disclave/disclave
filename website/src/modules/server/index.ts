import { init } from '@disclave/server';

export const initServer = async () => {
  const firebaseCert = JSON.parse(process.env.FIREBASE_CERT);
  const dbUri = process.env.DB_URI;
  const dbName = process.env.DB_NAME;

  await init(firebaseCert, dbUri, dbName);
};
