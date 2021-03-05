export interface CommentUrlMeta {
  websiteId: string,
  pageId: string
}

export interface Comment {
  id: string,
  text: string,
  timestamp: string,
  urlMeta: CommentUrlMeta
}