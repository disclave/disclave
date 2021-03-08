import {CommentEntity} from "./CommentEntity";

export type {
  CommentEntity
}

export interface UrlMeta {
  raw: string,
  websiteId: string,
  pageId: string
}

export interface AuthorInfo {
  id: string,
  name: string
}

export abstract class CommentRepository {
  abstract findComments(url: UrlMeta): Promise<Array<CommentEntity>>

  abstract addComment(author: AuthorInfo, text: string, url: UrlMeta): Promise<CommentEntity>
}
