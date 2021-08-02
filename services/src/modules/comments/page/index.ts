import { ContainerModule } from "inversify";
import { PageCommentRepository } from "./db";
import { PageCommentMongoRepository } from "./db/PageCommentMongoRepository";
import { PageCommentService } from "./service";
import { PageCommentServiceImpl } from "./service/PageCommentServiceImpl";

export type { PageComment, UrlId } from "./service";
export { PageCommentService };

export const container = new ContainerModule((bind) => {
  bind(PageCommentRepository).to(PageCommentMongoRepository);
  bind(PageCommentService).to(PageCommentServiceImpl);
});
