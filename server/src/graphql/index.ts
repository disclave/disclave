import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
import { authTypeDefs } from "@/modules/auth/Schemas";
import { authResolvers } from "@/modules/auth/Resolvers";
import { commentsTypeDefs } from "@/modules/comments/Schemas";
import { commentsResolvers } from "@/modules/comments/Resolvers";
import { usersTypeDefs } from "@/modules/users/Schemas";
import { usersResolvers } from "@/modules/users/Resolvers";
import { getSessionCookie } from "@/cookies";
import { container } from "@/inversify.config";
import { AuthProvider } from "@/modules/auth";

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

const authProvider = container.get(AuthProvider);

const parseSessionCookie = async (sessionCookie: string | null) => {
  if (!sessionCookie) return undefined;
  try {
    return await authProvider.verifySessionCookie(sessionCookie, false);
  } catch (e) {
    return undefined;
  }
};

const apolloServer = new ApolloServer({
  typeDefs: [baseTypes, authTypeDefs, commentsTypeDefs, usersTypeDefs],
  resolvers: [authResolvers, commentsResolvers, usersResolvers],
  context: async ({ req, res }) => {
    const sessionCookie = getSessionCookie(req);
    const session = await parseSessionCookie(sessionCookie);

    return {
      req,
      res,
      sessionCookie,
      session,
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
