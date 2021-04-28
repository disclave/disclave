import { initFirebaseApp } from "./firebase";
import { initApolloClient } from "./graphql";

export const init = (firebaseOptions: Object, graphqlUri: string) => {
  initApolloClient(graphqlUri);
  initFirebaseApp(firebaseOptions);
};

export { analytics } from "./firebase";
export { setAuthToken } from "./graphql";

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

export { createSelfProfile } from "./modules/users";
