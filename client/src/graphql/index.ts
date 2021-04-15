import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { DocumentNode } from "graphql";
import { OperationVariables } from "@apollo/client/core/types";

let clientInstance: ApolloClient<NormalizedCacheObject> | null = null;

export const initApolloClient = (uri: string) => {
  const httpLink = createHttpLink({
    uri,
  });

  clientInstance = new ApolloClient({
    link: httpLink,
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
