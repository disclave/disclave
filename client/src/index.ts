import { initFirebaseApp } from "./firebase";
import { initApolloClient } from "./graphql";
import { setDomain } from "./modules/config";

export const init = (
  firebaseOptions: Object,
  graphqlUri: string,
  domain: string
) => {
  setDomain(domain);
  initApolloClient(graphqlUri);
  initFirebaseApp(firebaseOptions);
};

export { analytics } from "./firebase";
export { setAuthToken } from "./graphql";

export { MessageType, sendMessage } from "./modules/message";

export {
  SessionProvider,
  useSession,
  login,
  register,
  loginWithGoogle,
  loginWithFacebook,
  applyActionCode,
} from "./modules/auth";
export type { ProfileModel, UserModel, SessionMessage } from "./modules/auth";

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

export {
  getTopCommentedPages,
  getTopRatedPages,
  getPageDetails,
  removePageVote,
  addPageVoteUp,
  addPageVoteDown,
} from "./modules/pages";
export type { PageDetailsModel, PageModel } from "./modules/pages";
