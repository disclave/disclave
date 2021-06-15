import { UrlService, ParsedUrlData, UrlMetaData } from "./index";
import { injectable } from "inversify";
import normalizeUrl from "normalize-url";
import metascraper from "metascraper";
import msCanonicalUrl from "./metascraper/CanonicalUrl";
import msTitle from "metascraper-title";
import msLogo from "metascraper-logo";
import msLogoFavicon from "metascraper-logo-favicon";

const gotOptions = { timeout: 3000 };
const urlScrapper = metascraper([
  msTitle(),
  (msCanonicalUrl as any)(),
  msLogoFavicon({ gotOpts: gotOptions }),
  msLogo(),
]);

function normalizationConfig(
  removeQueryParams: Array<RegExp | string> = [/^utm_\w+/i]
): normalizeUrl.Options {
  return {
    defaultProtocol: "https:",
    stripAuthentication: true,
    stripHash: true,
    stripTextFragment: true,
    stripWWW: true,
    removeQueryParameters: removeQueryParams,
    sortQueryParameters: true,
  };
}

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

  public async scrapeUrl(targetUrl: string): Promise<UrlMetaData | null> {
    try {
      console.info(`Scrape URL - starting for '${targetUrl}'`);
      const { html, url } = await fetchHtml(targetUrl);
      console.info(`Scrape URL - html fetched for '${targetUrl}'`);
      return await scrapeHtml(html, url);
    } catch (e) {
      console.warn("Scrape URL failed", e);
    }
    return null;
  }
}

function encodeURI(str: string): string {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16)
  );
}

async function fetchHtml(
  targetUrl: string
): Promise<{ html: string; url: string }> {
  console.info(`Fetching HTML from '${targetUrl}'`);
  const response = await fetch(targetUrl);
  console.info(
    `HTML fetched with - response status ${response.status} and redirected ${response.redirected} from '${targetUrl}'`
  );
  const html = await response.text();
  return {
    html,
    url: response.url,
  };
}

async function scrapeHtml(html: string, url: string): Promise<UrlMetaData> {
  const data = await urlScrapper({ html, url });
  return {
    canonical: (data as any).canonical || null,
    title: data.title || null,
    logo: (data as any).logo || null,
  };
}
