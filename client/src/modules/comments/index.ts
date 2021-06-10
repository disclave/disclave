export type { PageCommentModel } from "./page";
export { getPageComments, createPageComment } from "./page";

export type { RankingCommentModel } from "./ranking";
export { getLatestCommentsRanking, getTopCommentsRanking } from "./ranking";

export {
  removeCommentVote,
  addCommentVoteUp,
  addCommentVoteDown,
} from "./vote";
