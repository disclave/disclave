const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT) || 3000;

const serverApp = express();
const webApp = next({
  dev
});

const webAppHandler = webApp.getRequestHandler();

webApp.prepare().then(() => {
  serverApp.use(webAppHandler);
  serverApp.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
