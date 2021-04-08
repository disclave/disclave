import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
import { authTypeDefs } from "../auth/Schemas";
import { authResolvers } from "../auth/Resolvers";
import { commentsTypeDefs } from "../comments/Schemas";
import { commentsResolvers } from "../comments/Resolvers";
import { usersTypeDefs } from "../users/Schemas";
import { usersResolvers } from "../users/Resolvers";

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

const getIdToken = (req: any): string | null => {
  const authorization = req?.headers?.authorization || null;
  if (authorization && authorization.startsWith("Bearer "))
    return authorization.replace("Bearer ", "");
  return null;
};

const apolloServer = new ApolloServer({
  typeDefs: [baseTypes, authTypeDefs, commentsTypeDefs, usersTypeDefs],
  resolvers: [authResolvers, commentsResolvers, usersResolvers],
  context: ({ req, res }) => {
    const idToken = getIdToken(req);

    return {
      req,
      res,
      idToken,
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
