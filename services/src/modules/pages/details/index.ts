import { ContainerModule } from "inversify";
import { PageDetailsRepository } from "./db";
import { PageDetailsMongoRepository } from "./db/PageDetailsMongoRepository";
import { PageDetailsService } from "./service";
import { PageDetailsServiceImpl } from "./service/PageDetailsServiceImpl";

export type { PageDetails } from "./service";
export { PageDetailsService };

export { typeDefs, resolvers } from "./gql";

export const container = new ContainerModule((bind) => {
  bind(PageDetailsRepository).to(PageDetailsMongoRepository);
  bind(PageDetailsService).to(PageDetailsServiceImpl);
});
