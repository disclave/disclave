const { toRule, url: urlFn } = require("@metascraper/helpers");

const toUrl = toRule(urlFn);

const CanonicalUrl = () => ({
  canonical: [
    toUrl(($) => $('link[rel="canonical"]').attr("href")),
    toUrl(($) => $('link[rel="alternate"][hreflang="x-default"]').attr("href")),
  ],
});
export default CanonicalUrl;
