import { ContainerModule } from "inversify";
import { CommentRankingRepository } from "./db";
import { CommentRankingMongoRepository } from "./db/CommentRankingMongoRepository";
import { CommentRankingService } from "./service";
import { CommentRankingServiceImpl } from "./service/CommentRankingServiceImpl";

export { CommentRankingService };

export { typeDefs, resolvers } from "./gql";

export const container = new ContainerModule((bind) => {
  bind(CommentRankingRepository).to(CommentRankingMongoRepository);
  bind(CommentRankingService).to(CommentRankingServiceImpl);
});
