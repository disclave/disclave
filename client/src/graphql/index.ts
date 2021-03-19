import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { currentUser } from "../auth";

let clientInstance: ApolloClient<NormalizedCacheObject> | null = null;

export const initApolloClient = (uri: string) => {
  const httpLink = createHttpLink({
    uri,
  });

  const authLink = setContext(async (_, { headers }) => {
    const user = await currentUser();
    let authorization: string = undefined;
    if (user != null) {
      const idToken = await user.getIdToken();
      authorization = "Bearer " + idToken;
    }

    return {
      headers: {
        ...headers,
        authorization,
      },
    };
  });

  clientInstance = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const client = () => {
  if (clientInstance == null)
    throw "Client is not initialized. Run initApolloClient first!";

  return clientInstance;
};
