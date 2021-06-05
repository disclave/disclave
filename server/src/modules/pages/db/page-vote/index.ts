import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";

export interface UrlId {
  websiteId: string;
  pageId: string;
}

export abstract class PageVoteRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract setVoteUp(urlId: UrlId, uid: UserId): Promise<boolean>;
  abstract setVoteDown(urlId: UrlId, uid: UserId): Promise<boolean>;
  abstract removeVote(urlId: UrlId, uid: UserId): Promise<boolean>;
}
