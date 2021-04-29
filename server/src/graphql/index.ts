import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
import { commentsTypeDefs } from "@/modules/comments/Schemas";
import { commentsResolvers } from "@/modules/comments/Resolvers";
import { usersTypeDefs } from "@/modules/profiles/Schemas";
import { usersResolvers } from "@/modules/profiles/Resolvers";
import { authTypeDefs } from "@/modules/auth/Schemas";
import { authResolvers } from "@/modules/auth/Resolvers";

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
  // TODO: modify origin and allow only disclave and chrome extension?
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

const createApolloHandler = (path: string) => {
  const apolloServer = new ApolloServer({
    typeDefs: [baseTypes, authTypeDefs, commentsTypeDefs, usersTypeDefs],
    resolvers: [authResolvers, commentsResolvers, usersResolvers],
    context: async ({ req, res }) => {
      const idToken = getIdToken(req);

      return {
        req,
        res,
        idToken,
      };
    },
  });

  return apolloServer.createHandler({ path });
};

export const graphqlHandler = (path: string) => {
  const apolloHandler = createApolloHandler(path);

  return cors((req, res) => {
    if (req.method === "OPTIONS") {
      return res.end();
    }

    return apolloHandler(req, res);
  });
};
