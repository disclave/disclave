import { initFirebaseApp } from "./firebase";
import { initApolloClient } from "./graphql";
import { enableUserCookieUpdates } from "./modules/auth";

export const init = (
  firebaseOptions: Object,
  graphqlUri: string,
  autoUpdateUserCookie: boolean
) => {
  initFirebaseApp(firebaseOptions);
  initApolloClient(graphqlUri);

  if (autoUpdateUserCookie) enableUserCookieUpdates();
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

export {
  getComments,
  createComment,
  removeCommentVote,
  addCommentVoteUp,
  addCommentVoteDown,
} from "./modules/comments";
export type { CommentModel } from "./modules/comments";

export { getSelfProfile, createSelfProfile } from "./modules/users";
export type { UserProfileModel } from "./modules/users";
