import { container as commentsContainer } from "./comments";
import { container as commentRankingContainer } from "./ranking";
import { container as commentVoteContainer } from "./voting";

export { CommentService } from "./comments";
export { CommentRankingService } from "./ranking";
export { CommentVoteService } from "./voting";

export const containers = [
  commentsContainer,
  commentRankingContainer,
  commentVoteContainer,
]
