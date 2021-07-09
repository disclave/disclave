import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { DocumentNode } from "graphql";
import { OperationVariables } from "@apollo/client/core/types";
import { setContext } from "@apollo/client/link/context";

let clientInstance: ApolloClient<NormalizedCacheObject> | null = null;

let authToken: string | null = null;
export const setAuthToken = (token: string | null) => (authToken = token);

export const initApolloClient = (uri: string) => {
  const httpLink = createHttpLink({
    uri,
  });

  const authLink = setContext((_, { headers }) => {
    headers = headers || {};
    if (authToken) headers.authorization = `Bearer ${authToken}`;
    return {
      headers,
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

export const runQuery = async <T>(
  query: DocumentNode,
  variables: OperationVariables,
  dataField: string,
  noCache: boolean = false
): Promise<T> => {
  const result = await client().query({
    query,
    variables,
    fetchPolicy: noCache ? "network-only" : undefined,
  });
  return result.data[dataField];
};
