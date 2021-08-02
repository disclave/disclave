import { container as pageCommentsContainer } from "./page";
import { container as commentRankingContainer } from "./ranking";
import { container as commentVoteContainer } from "./voting";

export { PageCommentService } from "./page";
export { CommentRankingService } from "./ranking";
export { CommentVoteService } from "./voting";

export const containers = [
  pageCommentsContainer,
  commentRankingContainer,
  commentVoteContainer,
];
