import { UrlService, ParsedUrlData, UrlMetaData } from "./index";
import { injectable } from "inversify";
import normalizeUrl from "normalize-url";
import metascraper from "metascraper";
import msTitle from "metascraper-title";
import msLogo from "metascraper-logo";
import msLogoFavicon from "metascraper-logo-favicon";
import got from "got/dist/source";

const gotOptions = { timeout: 3000 };
const urlScrapper = metascraper([
  msTitle(),
  msLogo(),
  msLogoFavicon({ gotOpts: gotOptions }),
]);

@injectable()
export class UrlServiceImpl implements UrlService {
  public parseUrl(raw: string): ParsedUrlData {
    const normalized = normalizeUrl(raw);
    const url = new URL(normalized);
    return {
      raw,
      normalized,
      websiteId: encodeURI(url.hostname),
      pageId: encodeURI(url.pathname),
    };
  }

  public async scrapUrl(targetUrl: string): Promise<UrlMetaData | null> {
    try {
      const { html, url } = await fetchHtml(targetUrl);
      return await scrapHtml(html, url);
    } catch {
      // can not reach this website - it may not exist
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
  const { body: html, url } = await got(targetUrl, gotOptions);
  return {
    html,
    url,
  };
};

const scrapHtml = async (html: string, url: string): Promise<UrlMetaData> => {
  const data = await urlScrapper({ html, url });
  return {
    title: data.title || null,
    logo: (data as any).logo || null,
  };
};
