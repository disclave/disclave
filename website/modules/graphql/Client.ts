import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { currentUser } from '../auth/auth';

const httpLink = createHttpLink({
  uri: '/api/graphql'
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
      idToken
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
