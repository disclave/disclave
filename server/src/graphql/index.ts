import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
import { commentsTypeDefs } from "@/modules/comments/Schemas";
import { commentsResolvers } from "@/modules/comments/Resolvers";
import { usersTypeDefs } from "@/modules/profiles/Schemas";
import { usersResolvers } from "@/modules/profiles/Resolvers";
import { Session } from "@/modules/auth";

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

const createApolloHandler = (
  path: string,
  sessionParser: (req: any) => Promise<Session>
) => {
  const apolloServer = new ApolloServer({
    typeDefs: [baseTypes, commentsTypeDefs, usersTypeDefs],
    resolvers: [commentsResolvers, usersResolvers],
    context: async ({ req, res }) => {
      const session = await sessionParser(req);

      return {
        req,
        res,
        session,
      };
    },
  });

  return apolloServer.createHandler({ path });
};

export const graphqlHandler = (
  path: string,
  sessionParser: (req: any) => Promise<Session>
) => {
  const apolloHandler = createApolloHandler(path, sessionParser);

  return cors((req, res) => {
    if (req.method === "OPTIONS") {
      return res.end();
    }

    return apolloHandler(req, res);
  });
};
