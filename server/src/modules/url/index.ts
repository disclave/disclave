export interface ParsedUrlData {
  raw: string;
  normalized: string;
  websiteId: string;
  pageId: string;
}

export interface UrlMetaData {
  title: string | null;
  logo: string | null;
}
export abstract class UrlService {
  abstract parseUrl(raw: String): ParsedUrlData;

  abstract scrapUrl(url: String): Promise<UrlMetaData>;
}
