import { PageConfigEntity, PageConfigRepository } from "../db";
import { inject, injectable } from "inversify";
import { PageConfigService } from ".";
import { PageConfig } from "./models";

@injectable()
export class PageConfigServiceImpl implements PageConfigService {
  @inject(PageConfigRepository)
  private repository: PageConfigRepository;

  public async getPageConfig(
    normalizedUrl: string
  ): Promise<PageConfig | null> {
    const pageConfig = await this.repository.findPageConfig(normalizedUrl);
    return pageConfig ? toDomain(pageConfig) : null;
  }
}

function toDomain(entity: PageConfigEntity): PageConfig {
  return {
    url: entity.id,
    preserveQueryParams: entity.preserveQueryParams,
  };
}
