import { UrlService, ParsedUrlData, UrlMetaData } from "./index";
import { injectable } from "inversify";
import normalizeUrl from "normalize-url";
import metascraper from "metascraper";
import { canonicalUrl } from "./metascraper";
import msTitle from "metascraper-title";
import msLogo from "metascraper-logo";
import msLogoFavicon from "metascraper-logo-favicon";

const gotOptions = { timeout: 3000 };
const urlScrapper = metascraper([
  msTitle(),
  (canonicalUrl as any)(),
  msLogo(),
  msLogoFavicon({ gotOpts: gotOptions }),
]);

const normalizationConfig = (
  removeQueryParams: Array<RegExp | string> = [/^utm_\w+/i]
): normalizeUrl.Options => ({
  defaultProtocol: "https:",
  stripAuthentication: true,
  stripHash: true,
  stripTextFragment: true,
  removeQueryParameters: removeQueryParams ? [/[\s\S]*/] : [/^utm_\w+/i],
  sortQueryParameters: true,
});

@injectable()
export class UrlServiceImpl implements UrlService {
  public normalizeUrl(
    url: string,
    removeQueryParams: boolean | Array<string | RegExp>
  ): string {
    if (removeQueryParams === true) removeQueryParams = [/[\s\S]*/];
    else if (removeQueryParams === false) removeQueryParams = [/^utm_\w+/i];

    const config = normalizationConfig(removeQueryParams);
    return normalizeUrl(url, config);
  }

  public parseUrl(normalizedURL: string): ParsedUrlData {
    const url = new URL(normalizedURL);
    return {
      websiteId: encodeURI(url.hostname),
      pageId: encodeURI(url.pathname + url.search),
    };
  }

  public async scrapUrl(targetUrl: string): Promise<UrlMetaData | null> {
    try {
      const { html, url } = await fetchHtml(targetUrl);
      return await scrapHtml(html, url);
    } catch (e) {
      console.warn("scrapUrl", e);
    }
    return null;
  }
}

const encodeURI = (str: string): string => {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16)
  );
};

const fetchHtml = async (
  targetUrl: string
): Promise<{ html: string; url: string }> => {
  const response = await fetch(targetUrl);
  const html = await response.text();
  return {
    html,
    url: response.url,
  };
};

const scrapHtml = async (html: string, url: string): Promise<UrlMetaData> => {
  const data = await urlScrapper({ html, url });
  return {
    canonical: (data as any).canonical || null,
    title: data.title || null,
    logo: (data as any).logo || null,
  };
};
