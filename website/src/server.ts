const server = require('@disclave/server');
const config = require('./modules/server/config.ts');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const app = next({
  dev
});

const handler = app.getRequestHandler();

app.prepare().then(() => {
  server.runServer(config.getConfig(), handler);
});
