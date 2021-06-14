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
  getPageComments,
  createPageComment,
  getLatestCommentsRanking,
  getTopCommentsRanking,
  removeCommentVote,
  addCommentVoteUp,
  addCommentVoteDown,
} from "./modules/comments";
export type { PageCommentModel, RankingCommentModel } from "./modules/comments";

export {
  getPageDetails,
  removePageVote,
  addPageVoteUp,
  addPageVoteDown,
  getTopCommentedPages,
  getTopRatedPages,
} from "./modules/pages";
export type {
  PageDetailsModel,
  UrlId,
  RankingPageModel,
} from "./modules/pages";
