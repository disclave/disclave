const helpers = require("@metascraper/helpers");

const toUrl = helpers.toRule(helpers.url);

export default function CanonicalUrl() {
  return {
    canonical: [
      toUrl(($) => $('link[rel="canonical"]').attr("href")),
      toUrl(($) =>
        $('link[rel="alternate"][hreflang="x-default"]').attr("href")
      ),
    ],
  };
}
