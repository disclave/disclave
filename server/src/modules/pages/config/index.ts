import { ContainerModule } from "inversify";
import { PageConfigRepository } from "./db";
import { PageConfigMongoRepository } from "./db/PageConfigMongoRepository";
import { PageConfigService } from "./service";
import { PageConfigServiceImpl } from "./service/PageConfigServiceImpl";

export type { PageConfig } from "./service";
export { PageConfigService };

export const container = new ContainerModule((bind) => {
  bind(PageConfigRepository).to(PageConfigMongoRepository);
  bind(PageConfigService).to(PageConfigServiceImpl);
});
