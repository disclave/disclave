import {
  container as pageCommentsContainer,
  typeDefs as pageCommentsTypeDefs,
  resolvers as pageCommentsResolvers,
} from "./page";
import {
  container as commentRankingContainer,
  typeDefs as commentRankingTypeDefs,
  resolvers as commentRankingResolvers,
} from "./ranking";
import {
  container as commentVoteContainer,
  typeDefs as commentVoteTypeDefs,
  resolvers as commentVoteResolvers,
} from "./voting";

export { PageCommentService } from "./page";
export { CommentRankingService } from "./ranking";
export { CommentVoteService } from "./voting";

export const containers = [
  pageCommentsContainer,
  commentRankingContainer,
  commentVoteContainer,
];

export const typeDefs = [
  pageCommentsTypeDefs,
  commentRankingTypeDefs,
  commentVoteTypeDefs,
];

export const resolvers = () => [
  pageCommentsResolvers(),
  commentRankingResolvers(),
  commentVoteResolvers(),
];
