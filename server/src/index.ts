import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import express from "express";
import { prepareApolloServer } from "./graphql";
import {
  init as initServices,
  runAllMigrations,
  ServicesConfig,
} from "@disclave/services";

type WebAppHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  parsedUrl?: UrlWithParsedQuery
) => Promise<void>;

export interface ServerConfig extends ServicesConfig {
  port: number;
}

export { getUserCookie } from "./cookies";

export const runServer = async (
  config: ServerConfig,
  webAppHandler: WebAppHandler
) => {
  console.info("Running server");
  await initServices(config);

  console.info("Services initialized. Straring GraphQL");
  const server = prepareApolloServer();
  await server.start();

  const app = express();

  server.applyMiddleware({ app, path: "/api/graphql" });

  app.get("*", (req, res) => {
    webAppHandler(req, res);
  });

  console.info("Starting Express listener");
  await new Promise<void>((resolve) =>
    app.listen({ port: config.port }, resolve)
  );

  console.info("Cheking migrations");
  await runAllMigrations();

  console.log(`> Ready on http://localhost:${config.port}`);
  console.log(
    `> GQL server ready at http://localhost:${config.port}${server.graphqlPath}`
  );
};
