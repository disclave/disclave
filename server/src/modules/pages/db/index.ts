import { PageDetailsEntity } from "./entity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";

export type { PageDetailsEntity };

export interface UrlMeta {
  websiteId: string;
  pageId: string;
  normalized: string;
}

export interface PageDetailsData {
  title: string | null;
  logo: string | null;
}

export abstract class PageRepository<T = unknown> extends BaseRepository<T> {
  abstract findPageDetails(
    normalizedUrl: string,
    uid: UserId | null
  ): Promise<PageDetailsEntity | null>;

  abstract createOrUpdatePageDetails(
    urlMeta: UrlMeta,
    alternativeUrl: string | null,
    data: PageDetailsData | null,
    uid: UserId | null
  ): Promise<PageDetailsEntity>;
}
