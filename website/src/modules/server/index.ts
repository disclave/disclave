import { init } from '@webchat/server';

export const initServer = () => {
  init(JSON.parse(process.env.FIREBASE_CERT));
};
