import { typeDefs as pageTypeDefs } from "./page";
import { typeDefs as rankingTypeDefs } from "./ranking";
import { typeDefs as votingTypeDefs } from "./voting";

import { resolvers as pageResolvers } from "./page";
import { resolvers as rankingResolvers } from "./ranking";
import { resolvers as votingResolvers } from "./voting";

export const typeDefs = [pageTypeDefs, rankingTypeDefs, votingTypeDefs];
export const resolvers = () => [
  pageResolvers(),
  rankingResolvers(),
  votingResolvers(),
];
