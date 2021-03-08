
export interface ParsedUrlData {
  raw: string,
  websiteId: string,
  pageId: string
}

export interface IUrlService {
  parseUrl(raw: String): ParsedUrlData
}
