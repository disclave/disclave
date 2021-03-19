import { initFirebaseApp } from "./firebase";
import { initApolloClient } from "./graphql";

export const init = (firebaseOptions: Object, graphqlUri: string) => {
  initFirebaseApp(firebaseOptions);
  initApolloClient(graphqlUri);
};

export { getComments, createComment } from "./modules/comments";
