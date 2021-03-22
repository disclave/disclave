import { initFirebaseApp } from "./firebase";
import { initApolloClient } from "./graphql";

export const init = (firebaseOptions: Object, graphqlUri: string) => {
  initFirebaseApp(firebaseOptions);
  initApolloClient(graphqlUri);
};

export {
  login,
  logout,
  currentUser,
  onAuthStateChanged,
  useUserProfile,
} from "./auth";
export { getComments, createComment } from "./modules/comments";
export type { CommentModel } from "./modules/comments";
