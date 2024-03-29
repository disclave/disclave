import { ContainerModule } from "inversify";
import { PageCommentRepository } from "./db";
import { PageCommentMongoRepository } from "./db/PageCommentMongoRepository";
import { PageCommentService } from "./service";
import { PageCommentServiceImpl } from "./service/PageCommentServiceImpl";

export type { PageComment } from "./service";
export { PageCommentService };

export { typeDefs, resolvers } from "./gql";

export const container = new ContainerModule((bind) => {
  bind(PageCommentRepository).to(PageCommentMongoRepository);
  bind(PageCommentService).to(PageCommentServiceImpl);
});
