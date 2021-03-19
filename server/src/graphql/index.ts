import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
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

const apolloServer = new ApolloServer({
  typeDefs: [baseTypes, commentsTypeDefs, usersTypeDefs],
  resolvers: [commentsResolvers, usersResolvers],
  context: ({ req }) => {
    let idToken: string | null = null;
    const authorization = req.headers.authorization || null;
    if (authorization && authorization.startsWith("Bearer "))
      idToken = authorization.replace("Bearer ", "");

    return {
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
