import { ApolloServer, ExpressContext, gql } from "apollo-server-express";
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

type TokenWithDecoded = { idToken: IdToken; decodedToken: DecodedIdToken };

export interface Context extends ExpressContext {
  idToken: IdToken | null;
  decodedToken: DecodedIdToken | null;
}

type Resolver<T> = (
  parent: undefined,
  args: T,
  context: Context
) => any | Promise<any>;

export type Resolvers<T = any> = {
  Mutation?: {
    [P in keyof T]: Resolver<T[P]>;
  };
  Query?: {
    [P in keyof T]: Resolver<T[P]>;
  };
};

export const prepareApolloServer = (): ApolloServer => {
  const authProvider = getAuthProvider();
  const getIdToken = async (req: any): Promise<TokenWithDecoded | null> => {
    const authorization = req?.headers?.authorization || null;
    if (!authorization || !authorization.startsWith("Bearer ")) return null;

    const idToken = asIdToken(authorization.replace("Bearer ", ""));
    const decodedToken = await authProvider.verifyIdToken(idToken, false);
    return { idToken, decodedToken };
  };

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
    context: async ({ req, res }): Promise<Context> => {
      const auth = await getIdToken(req);

      return {
        req,
        res,
        idToken: auth ? auth.idToken : null,
        decodedToken: auth ? auth.decodedToken : null,
      };
    },
  });

  return apolloServer;
};
