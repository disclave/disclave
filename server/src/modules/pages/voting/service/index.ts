import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

export abstract class PageVoteService {
  abstract setVoteUp(urlId: UrlId, userId: UserId): Promise<boolean>;
  abstract setVoteDown(urlId: UrlId, userId: UserId): Promise<boolean>;
  abstract removeVote(urlId: UrlId, userId: UserId): Promise<boolean>;
}
