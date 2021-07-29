const server = require('@disclave/server');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT) || 3000;

const app = next({
  dev
});

const handler = app.getRequestHandler();

app.prepare().then(() => {
  server.runServer(port, handler);
});
