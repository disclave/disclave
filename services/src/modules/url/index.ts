export interface ParsedUrlData {
  websiteId: string;
  pageId: string;
}

export interface UrlMetaData {
  canonical: string | null;
  title: string | null;
  logo: string | null;
}
export abstract class UrlService {
  abstract normalizeUrl(
    url: string,
    preserveQueryParams: boolean | Array<string | RegExp>
  ): string;

  abstract parseUrl(normalizedUrl: string): ParsedUrlData;

  abstract scrapUrl(url: string): Promise<UrlMetaData | null>;
}
