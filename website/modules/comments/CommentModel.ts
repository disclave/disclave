export interface CommentUrlMeta {
  websiteId: string,
  pageId: string
}

export interface CommentModel {
  id: string,
  text: string,
  timestamp: string,
  urlMeta: CommentUrlMeta
}