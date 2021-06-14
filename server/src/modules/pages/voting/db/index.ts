import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

export abstract class PageVoteRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract setVoteUp(urlId: UrlId, uid: UserId): Promise<boolean>;
  abstract setVoteDown(urlId: UrlId, uid: UserId): Promise<boolean>;
  abstract removeVote(urlId: UrlId, uid: UserId): Promise<boolean>;
}
