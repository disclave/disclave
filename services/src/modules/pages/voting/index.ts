import { ContainerModule } from "inversify";
import { PageVoteRepository } from "./db";
import { PageVoteMongoRepository } from "./db/PageVoteMongoRepository";
import { PageVoteService } from "./service";
import { PageVoteServiceImpl } from "./service/PageVoteServiceImpl";

export { PageVoteService };

export const container = new ContainerModule((bind) => {
  bind(PageVoteRepository).to(PageVoteMongoRepository);
  bind(PageVoteService).to(PageVoteServiceImpl);
});
