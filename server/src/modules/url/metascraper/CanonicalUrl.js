// TODO: extract to separate package and reorganize dependencies
import isRelativeUrl from "is-relative-url";
import _normalizeUrl from "normalize-url";

const urlRegex = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
); // fragment locator

function isEmpty(value) {
  if (value == null) {
    return true;
  }
  return !!value.length;
}

const urlObject = (...args) => {
  try {
    return new URL(...args);
  } catch (err) {
    return { toString: () => "" };
  }
};

const absoluteUrl = (baseUrl, relativePath) => {
  if (isEmpty(relativePath)) return urlObject(baseUrl).toString();
  return urlObject(relativePath, baseUrl).toString();
};

const sanetizeUrl = (url, opts) =>
  _normalizeUrl(url, {
    stripWWW: false,
    sortQueryParameters: false,
    removeTrailingSlash: false,
    ...opts,
  });

const normalizeUrl = (baseUrl, relativePath, opts) => {
  try {
    return sanetizeUrl(absoluteUrl(baseUrl, relativePath), opts);
  } catch (_) {
    return null;
  }
};

const isUrl = (url, { relative = false } = {}) =>
  relative ? isRelativeUrl(url) : urlRegex.test(url);

const url = (value, { url = "" } = {}) => {
  if (isEmpty(value)) return null;

  try {
    const absoluteUrl = normalizeUrl(url, value);
    if (isUrl(absoluteUrl)) return absoluteUrl;
  } catch (_) {}

  return isUri(value) ? value : null;
};

const toRule = (mapper, opts) => (rule) => async ({ htmlDom, url }) => {
  const value = await rule(htmlDom, url);
  return mapper(value, { url, ...opts });
};

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
