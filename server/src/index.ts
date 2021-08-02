import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import express from "express";
import { prepareApolloServer } from "./graphql";
import {
  init as initServices,
  DbConfig,
  MailjetConfig,
  AwsConfig,
} from "@disclave/services";

type WebAppHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  parsedUrl?: UrlWithParsedQuery
) => Promise<void>;

type Config = {
  port: number;
  firebaseServiceAccountObject: Object;
  dbConfig: DbConfig;
  mjConfig: MailjetConfig;
  awsConfig: AwsConfig;
};

export const runServer = async (
  config: Config,
  webAppHandler: WebAppHandler
) => {
  await initServices(
    config.firebaseServiceAccountObject,
    config.dbConfig,
    config.mjConfig,
    config.awsConfig,
  );

  const server = prepareApolloServer();
  await server.start();

  const app = express();

  server.applyMiddleware({ app, path: "/api/graphql" });

  app.get("*", (req, res) => {
    webAppHandler(req, res);
  });

  await new Promise<void>((resolve) =>
    app.listen({ port: config.port }, resolve)
  );
  console.log(`> Ready on http://localhost:${config.port}`);
  console.log(
    `> GQL server ready at http://localhost:${config.port}${server.graphqlPath}`
  );
};
