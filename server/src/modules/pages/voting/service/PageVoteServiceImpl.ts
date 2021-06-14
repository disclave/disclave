import { PageVoteService } from "./index";
import { inject, injectable } from "inversify";
import { UserId } from "@/modules/auth";
import { PageVoteRepository } from "../db";
import { UrlId } from "@/modules/pages";

@injectable()
export class PageVoteServiceImpl implements PageVoteService {
  @inject(PageVoteRepository)
  private repository: PageVoteRepository;

  public async setVoteUp(urlId: UrlId, userId: UserId): Promise<boolean> {
    return await this.repository.setVoteUp(urlId, userId);
  }

  public async setVoteDown(urlId: UrlId, userId: UserId): Promise<boolean> {
    return await this.repository.setVoteDown(urlId, userId);
  }

  public async removeVote(urlId: UrlId, userId: UserId): Promise<boolean> {
    return await this.repository.removeVote(urlId, userId);
  }
}
