import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { currentUser } from "../auth";

let clientInstance: ApolloClient<NormalizedCacheObject> | null = null;

const initApolloClient = (uri: string) => {
  const httpLink = createHttpLink({
    uri,
  });

  const authLink = setContext(async (_, { headers }) => {
    const user = await currentUser();
    let idToken: string = undefined;
    if (user != null) {
      idToken = await user.getIdToken();
    }

    return {
      headers: {
        ...headers,
        idToken,
      },
    };
  });

  clientInstance = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const index = () => {
  if (clientInstance == null)
    throw "Client is not initialized. Run initApolloClient first!";

  return clientInstance;
};
