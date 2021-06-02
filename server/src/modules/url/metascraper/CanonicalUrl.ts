import { toRule, url } from "@metascraper/helpers";

const toUrl = toRule(url);

export const canonicalUrl = () => ({
  canonical: [
    toUrl(($) => $('meta[property="og:url"]').attr("content")),
    toUrl(($) => $('meta[name="twitter:url"]').attr("content")),
    toUrl(($) => $('meta[property="twitter:url"]').attr("content")),
    toUrl(($) => $('link[rel="canonical"]').attr("href")),
    toUrl(($) => $('link[rel="alternate"][hreflang="x-default"]').attr("href")),
  ],
});
