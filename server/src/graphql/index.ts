import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
import { authTypeDefs } from "@/modules/auth/Schemas";
import { authResolvers } from "@/modules/auth/Resolvers";
import { commentsTypeDefs } from "@/modules/comments/Schemas";
import { commentsResolvers } from "@/modules/comments/Resolvers";
import { usersTypeDefs } from "@/modules/users/Schemas";
import { usersResolvers } from "@/modules/users/Resolvers";
import { getSessionCookie } from "@/cookies";

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
