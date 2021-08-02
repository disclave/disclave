import { typeDefs as detailsTypeDefs } from "./details";
import { typeDefs as rankingTypeDefs } from "./ranking";
import { typeDefs as votingTypeDefs } from "./voting";

import { resolvers as detailsResolvers } from "./details";
import { resolvers as rankingResolvers } from "./ranking";
import { resolvers as votingResolvers } from "./voting";

export const typeDefs = [detailsTypeDefs, rankingTypeDefs, votingTypeDefs];
export const resolvers = () => [
  detailsResolvers(),
  rankingResolvers(),
  votingResolvers(),
];
