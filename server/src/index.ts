import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import express from "express";

type WebAppHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  parsedUrl?: UrlWithParsedQuery
) => Promise<void>;

export const runServer = (port: number, webAppHandler: WebAppHandler) => {
  const app = express();

  app.get("*", (req, res) => {
    webAppHandler(req, res);
  });

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
};
