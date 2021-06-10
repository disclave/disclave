import { CommentEntity } from "./CommentEntity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

export type { CommentEntity };
export interface AuthorInfo {
  uid: UserId;
  name: string;
}

export interface UrlData {
  urlId: UrlId;
  rawUrl: string;
  urlMeta: null | {
    logo: string | null;
    title: string | null;
  };
}

export abstract class CommentRepository<T = unknown> extends BaseRepository<T> {
  abstract findComments(
    urlId: UrlId,
    uid: UserId | null
  ): Promise<Array<CommentEntity>>;

  abstract findLatestComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<CommentEntity>>;

  abstract findTopComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<CommentEntity>>;

  abstract countComments(urlId: UrlId): Promise<number>;

  abstract addComment(
    author: AuthorInfo,
    text: string,
    urlData: UrlData
  ): Promise<CommentEntity>;

  abstract setVoteUp(commentId: string, uid: UserId): Promise<boolean>;
  abstract setVoteDown(commentId: string, uid: UserId): Promise<boolean>;
  abstract removeVote(commentId: string, uid: UserId): Promise<boolean>;
}
