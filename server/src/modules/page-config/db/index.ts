import { PageConfigEntity } from "./entity";
import { BaseRepository } from "@/repository";

export type { PageConfigEntity };

export abstract class PageConfigRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract findPageConfig(
    normalizedUrl: string
  ): Promise<PageConfigEntity | null>;
}
