export interface ParsedUrlData {
  raw: string;
  normalized: string;
  websiteId: string;
  pageId: string;
}

export interface UrlMetaData {
  canonical: string | null;
  title: string | null;
  logo: string | null;
}
export abstract class UrlService {
  abstract parseUrl(raw: String, removeQueryParams: boolean): ParsedUrlData;

  abstract scrapUrl(url: String): Promise<UrlMetaData | null>;
}
