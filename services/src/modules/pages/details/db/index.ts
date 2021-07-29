import { PageDetailsEntity, PageMetaEntity } from "./entity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

export type { PageDetailsEntity, PageMetaEntity };

export interface UrlMeta {
  websiteId: string;
  pageId: string;
  normalized: string;
}

export interface PageDetailsData {
  title: string | null;
  logo: string | null;
}

export abstract class PageDetailsRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract findPageMeta(urlId: UrlId): Promise<PageMetaEntity | null>;

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
