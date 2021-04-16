import { initFirebaseApp } from "./firebase";
import { initApolloClient } from "./graphql";

export const init = async (firebaseOptions: Object, graphqlUri: string) => {
  initApolloClient(graphqlUri);
  await initFirebaseApp(firebaseOptions);
};

export { analytics } from "./firebase";

export {
  loginEmailPass,
  logout,
  registerEmailPass,
  loginWithGoogle,
  loginWithFacebook,
  SessionProvider,
  useSession,
} from "./modules/auth";

export type { SessionModel } from "./modules/auth";

export { isUrl, stringToUrl, encodeUrl } from "./modules/url";

export {
  getComments,
  getLatestComments,
  getTopComments,
  createComment,
  removeCommentVote,
  addCommentVoteUp,
  addCommentVoteDown,
} from "./modules/comments";
export type {
  CommentModel,
  CommentUrlMeta,
  CommentAuthor,
  CommentVotes,
} from "./modules/comments";

export { getSelfProfile, createSelfProfile } from "./modules/users";
export type { UserProfileModel } from "./modules/users";
