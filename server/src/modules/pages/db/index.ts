import { PageEntity } from "./PageEntity";
import { PageDetailsEntity } from "./PageDetailsEntity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";

export type { PageEntity, PageDetailsEntity };

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
  abstract findTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<PageEntity>>;

  abstract findTopRatedPages(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<PageEntity>>;

  abstract findOrCreatePageDetails(
    url: UrlMeta,
    uid: UserId | null
  ): Promise<PageDetailsEntity>;

  abstract updatePageDetails(
    url: UrlMeta,
    data: PageDetailsData,
    uid: UserId | null
  ): Promise<PageDetailsEntity>;

  abstract setVoteUp(url: UrlMeta, uid: UserId): Promise<boolean>;
  abstract setVoteDown(url: UrlMeta, uid: UserId): Promise<boolean>;
  abstract removeVote(url: UrlMeta, uid: UserId): Promise<boolean>;
}
