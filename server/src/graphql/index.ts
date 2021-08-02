import { ApolloServer, gql } from "apollo-server-express";
import {
  getAuthProvider,
  DecodedIdToken,
  IdToken,
  asIdToken,
} from "@disclave/services";

import { typeDefs as authTypeDefs, resolvers as authResolvers } from "./auth";
import {
  typeDefs as profileTypeDefs,
  resolvers as profileResolvers,
} from "./profiles";
import {
  typeDefs as commentsTypeDefs,
  resolvers as commentsResolvers,
} from "./comments";
import {
  typeDefs as pagesTypeDefs,
  resolvers as pagesResolvers,
} from "./pages";

const baseTypes = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

const authProvider = getAuthProvider();
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
      profileTypeDefs,
    ],
    resolvers: [
      authResolvers(),
      ...pagesResolvers(),
      ...commentsResolvers(),
      profileResolvers(),
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
