import {
  container as commentsContainer,
  typeDefs as commentsTypeDefs,
  resolvers as commentsResolvers,
} from "./comments";
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

export { CommentService } from "./comments";
export { CommentRankingService } from "./ranking";
export { CommentVoteService } from "./voting";

export const containers = [
  commentsContainer,
  commentRankingContainer,
  commentVoteContainer,
];

export const typeDefs = [
  commentsTypeDefs,
  commentRankingTypeDefs,
  commentVoteTypeDefs,
];

export const resolvers = () => [
  commentsResolvers(),
  commentRankingResolvers(),
  commentVoteResolvers(),
];
