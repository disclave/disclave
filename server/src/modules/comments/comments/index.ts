import { ContainerModule } from "inversify";
import { CommentRepository } from "./db";
import { CommentMongoRepository } from "./db/CommentMongoRepository";
import { CommentService } from "./service";
import { CommentServiceImpl } from "./service/CommentServiceImpl";

export type { Comment } from "./service";
export { CommentService };

export { typeDefs, resolvers } from "./gql";

export const container = new ContainerModule((bind) => {
  bind(CommentRepository).to(CommentMongoRepository);
  bind(CommentService).to(CommentServiceImpl);
});
