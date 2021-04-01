import { initFirebaseApp } from "./firebase";
import { initApolloClient } from "./graphql";

export const init = (firebaseOptions: Object, graphqlUri: string) => {
  initFirebaseApp(firebaseOptions);
  initApolloClient(graphqlUri);
};

export {
  login,
  logout,
  register,
  loginWithGoogle,
  loginWithFacebook,
  currentUser,
  onAuthStateChanged,
  useSession,
} from "./auth";

export { isUrl, stringToUrl, encodeUrl } from "./modules/url";

export { getComments, createComment } from "./modules/comments";
export type { CommentModel } from "./modules/comments";

export { getSelfProfile, createSelfProfile } from "./modules/users";
export type { UserProfileModel } from "./modules/users";
