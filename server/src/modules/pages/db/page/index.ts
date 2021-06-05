import {
  PageEntity,
  PageDetailsEntity,
  UrlPageIdEntity,
} from "@/modules/pages/db/entity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";

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
  abstract findPageId(normalizedUrl: string): Promise<UrlPageIdEntity | null>;

  abstract saveOrUpdatePageId(
    urlMeta: UrlMeta,
    alternativeUrl: string | null,
    data: PageDetailsData | null
  ): Promise<UrlPageIdEntity>;

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
