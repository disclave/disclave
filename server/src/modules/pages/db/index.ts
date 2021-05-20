import { PageEntity } from "./PageEntity";
import { PageDetailsEntity } from "./PageDetailsEntity";
import { BaseRepository } from "@/repository";

export type { PageEntity, PageDetailsEntity };

export interface UrlMeta {
  websiteId: string;
  pageId: string;
}

export interface PageDetailsData {
  title: string | null;
  logo: string | null;
}

export abstract class PageRepository<T = unknown> extends BaseRepository<T> {
  abstract findTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number
  ): Promise<Array<PageEntity>>;

  abstract findPageDetails(url: UrlMeta): Promise<PageDetailsEntity | null>;

  abstract savePageDetails(url: UrlMeta, data: PageDetailsData): Promise<void>;
}
