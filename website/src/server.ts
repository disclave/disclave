const server = require('@disclave/server');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = next({
  dev
});

const handler = app.getRequestHandler();

app.prepare().then(() => {
  server.runServer(config(), handler);
});

const config = () => ({
  port: port,
  firebaseServiceAccountObject: firebaseCert(),
  dbConfig: dbConfig(),
  mjConfig: mailJetConfig(),
  awsConfig: awsConfig()
});

const firebaseCert = () => {
  if (!process.env.FIREBASE_CERT) throw new Error('FIREBASE_CERT env variable is missing');

  return JSON.parse(process.env.FIREBASE_CERT);
};

const dbConfig = () => {
  if (!process.env.DB_URI) throw new Error('DB_URI env variable is missing');
  if (!process.env.DB_NAME) throw new Error('DB_NAME env variable is missing');

  return {
    dbUri: process.env.DB_URI,
    dbName: process.env.DB_NAME
  };
};

const mailJetConfig = () => {
  if (!process.env.MJ_API_KEY) throw new Error('MJ_API_KEY env variable is missing');
  if (!process.env.MJ_API_SECRET) throw new Error('MJ_API_SECRET env variable is missing');
  if (!process.env.MJ_TEMPLATE_EMAIL_VERIFICATION)
    throw new Error('MJ_TEMPLATE_EMAIL_VERIFICATION env variable is missing');

  return {
    apiKey: process.env.MJ_API_KEY,
    apiSecret: process.env.MJ_API_SECRET,
    templates: {
      emailVerification: Number(process.env.MJ_TEMPLATE_EMAIL_VERIFICATION)
    }
  };
};

const awsConfig = () => {
  if (!process.env.AWS_ACCESS_KEY) throw new Error('AWS_ACCESS_KEY env variable is missing');
  if (!process.env.AWS_SECRET_ACCESS_KEY)
    throw new Error('AWS_SECRET_ACCESS_KEY env variable is missing');
  if (!process.env.AWS_BUCKET_NAME_PAGES)
    throw new Error('AWS_BUCKET_NAME_PAGES env variable is missing');

  return {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    buckets: {
      pages: process.env.AWS_BUCKET_NAME_PAGES
    }
  };
};
