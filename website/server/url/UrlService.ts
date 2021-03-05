export interface ParsedUrlData {
  raw: string,
  websiteId: string,
  pageId: string
}

export class UrlService {
  public parseUrl(raw: string): ParsedUrlData {
    const url = new URL(raw)
    return {
      raw,
      websiteId: encodeURI(url.hostname),
      pageId: encodeURI(url.pathname)
    }
  }
}

const encodeURI = (str: string): string => {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16))
}
