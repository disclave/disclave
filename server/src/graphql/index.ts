import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
import { authTypeDefs } from "../auth/Schemas";
import { authResolvers } from "../auth/Resolvers";
import { commentsTypeDefs } from "../comments/Schemas";
import { commentsResolvers } from "../comments/Resolvers";
import { usersTypeDefs } from "../users/Schemas";
import { usersResolvers } from "../users/Resolvers";
import cookie from "cookie";
import { getSessionCookie } from "../cookies";

// TODO: verify cors
const cors = Cors({
  allowMethods: ["POST", "GET", "OPTIONS"],
  allowHeaders: [
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "X-HTTP-Method-Override",
    "Content-Type",
    "Authorization",
    "Accept",
  ],
  origin: "*",
});

const baseTypes = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

const apolloServer = new ApolloServer({
  typeDefs: [baseTypes, authTypeDefs, commentsTypeDefs, usersTypeDefs],
  resolvers: [authResolvers, commentsResolvers, usersResolvers],
  context: ({ req, res }) => {
    const sessionCookie = getSessionCookie(req);

    return {
      req,
      res,
      sessionCookie,
    };
  },
});

export const graphqlHandler = (path: string) => {
  const handler = apolloServer.createHandler({ path });

  return cors((req, res) => {
    if (req.method === "OPTIONS") {
      return res.end();
    }

    return handler(req, res);
  });
};
