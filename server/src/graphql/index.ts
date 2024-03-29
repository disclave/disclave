import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
import { usersTypeDefs } from "@/modules/profiles/Schemas";
import { usersResolvers } from "@/modules/profiles/Resolvers";
import { authTypeDefs } from "@/modules/auth/Schemas";
import { authResolvers } from "@/modules/auth/Resolvers";
import { container } from "@/inversify.config";
import {
  asIdToken,
  AuthProvider,
  DecodedIdToken,
  IdToken,
} from "@/modules/auth";
import {
  typeDefs as commentsTypeDefs,
  resolvers as commentsResolvers,
} from "@/modules/comments";
import {
  typeDefs as pagesTypeDefs,
  resolvers as pagesResolvers,
} from "@/modules/pages";

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

const authProvider = container.get(AuthProvider);
type TokenWithDecoded = { idToken: IdToken; decodedToken: DecodedIdToken };

const getIdToken = async (req: any): Promise<TokenWithDecoded | null> => {
  const authorization = req?.headers?.authorization || null;
  if (!authorization || !authorization.startsWith("Bearer ")) return null;

  const idToken = asIdToken(authorization.replace("Bearer ", ""));
  const decodedToken = await authProvider.verifyIdToken(idToken, false);
  return { idToken, decodedToken };
};

const createApolloHandler = (path: string) => {
  const apolloServer = new ApolloServer({
    typeDefs: [
      baseTypes,
      authTypeDefs,
      ...pagesTypeDefs,
      ...commentsTypeDefs,
      usersTypeDefs,
    ],
    resolvers: [
      authResolvers,
      ...pagesResolvers(),
      ...commentsResolvers(),
      usersResolvers,
    ],
    context: async ({ req, res }) => {
      const auth = await getIdToken(req);

      return {
        req,
        res,
        idToken: auth ? auth.idToken : null,
        decodedToken: auth ? auth.decodedToken : null,
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
