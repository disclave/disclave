import { container as pageConfigContainer } from "./config";
import {
  container as pageDetailsContainer,
  typeDefs as pageDetailsTypeDefs,
  resolvers as pageDetailsResolvers,
} from "./details";
import {
  container as pageRankingContainer,
  typeDefs as pageRankingTypeDefs,
  resolvers as pageRankingResolvers,
} from "./ranking";
import {
  container as pageVoteContainer,
  typeDefs as pageVoteTypeDefs,
  resolvers as pageVoteResolvers,
} from "./voting";

export type { UrlId } from "./models";

export { PageDetailsService } from "./details";
export { PageRankingService } from "./ranking";

export const containers = [
  pageConfigContainer,
  pageDetailsContainer,
  pageRankingContainer,
  pageVoteContainer,
];

export const typeDefs = [
  pageDetailsTypeDefs,
  pageRankingTypeDefs,
  pageVoteTypeDefs,
];

export const resolvers = () => [
  pageDetailsResolvers(),
  pageRankingResolvers(),
  pageVoteResolvers(),
];
