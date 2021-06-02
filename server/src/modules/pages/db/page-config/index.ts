import { PageConfigEntity } from "@/modules/pages/db/entity";
import { BaseRepository } from "@/repository";

export abstract class PageConfigRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract findPageConfig(
    normalizedUrl: string
  ): Promise<PageConfigEntity | null>;
}
