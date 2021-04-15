import { initFirebaseApp } from "./firebase";
import { initApolloClient } from "./graphql";

export const init = (firebaseOptions: Object, graphqlUri: string) => {
  initFirebaseApp(firebaseOptions);
  initApolloClient(graphqlUri);
};

export { analytics } from "./firebase";

export {
  loginEmailPass,
  logout,
  registerEmailPass,
  loginWithGoogle,
  loginWithFacebook,
} from "./modules/auth";

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
