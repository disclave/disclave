interface CommentEntityUrlMeta {
  raw: string,
  websiteId: string,
  pageId: string
}

export interface CommentEntity {
  id: string,
  text: string,
  timestamp: string,
  url: CommentEntityUrlMeta
}