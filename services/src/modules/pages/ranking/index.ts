import { ContainerModule } from "inversify";
import { PageRankingRepository } from "./db";
import { PageRankingMongoRepository } from "./db/PageRankingMongoRepository";
import { PageRankingService } from "./service";
import { PageRankingServiceImpl } from "./service/PageRankingServiceImpl";

export { PageRankingService };

export { typeDefs, resolvers } from "./gql";

export const container = new ContainerModule((bind) => {
  bind(PageRankingRepository).to(PageRankingMongoRepository);
  bind(PageRankingService).to(PageRankingServiceImpl);
});
