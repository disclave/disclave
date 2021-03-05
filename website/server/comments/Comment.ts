export interface CommentUrlMeta {
  websiteId: string,
  pageId: string
}

export interface Comment {
  id: string,
  text: string,
  timestamp: number,
  urlMeta: CommentUrlMeta
}