import { ContainerModule } from "inversify";
import { CommentVoteRepository } from "./db";
import { CommentVoteMongoRepository } from "./db/CommentVoteMongoRepository";
import { CommentVoteService } from "./service";
import { CommentVoteServiceImpl } from "./service/CommentVoteServiceImpl";

export { CommentVoteService };

export const container = new ContainerModule((bind) => {
  bind(CommentVoteRepository).to(CommentVoteMongoRepository);
  bind(CommentVoteService).to(CommentVoteServiceImpl);
});
