export interface ParsedUrlData {
  raw: string;
  websiteId: string;
  pageId: string;
}

export abstract class UrlService {
  abstract parseUrl(raw: String): ParsedUrlData;
}
