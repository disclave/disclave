import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

type WebAppHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  parsedUrl?: UrlWithParsedQuery
) => Promise<void>;

export const runServer = async (port: number, webAppHandler: WebAppHandler) => {
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();

  server.applyMiddleware({ app, path: "/api/graphql" });

  app.get("*", (req, res) => {
    webAppHandler(req, res);
  });

  await new Promise<void>(resolve => app.listen({ port: port }, resolve));
  console.log(`> Ready on http://localhost:${port}`);
  console.log(`> GQL server ready at http://localhost:${port}${server.graphqlPath}`);
};
