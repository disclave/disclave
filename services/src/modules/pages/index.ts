import { container as pageConfigContainer } from "./config";
import { container as pageDetailsContainer } from "./details";
import { container as pageRankingContainer } from "./ranking";
import { container as pageVoteContainer } from "./voting";

export type { UrlId } from "./models";

export { PageDetailsService } from "./details";
export { PageRankingService } from "./ranking";
export { PageVoteService } from "./voting";

export const containers = [
  pageConfigContainer,
  pageDetailsContainer,
  pageRankingContainer,
  pageVoteContainer,
];
