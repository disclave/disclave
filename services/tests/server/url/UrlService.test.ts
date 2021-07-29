import { UrlServiceImpl } from "@/modules/url/UrlServiceImpl";

const service = new UrlServiceImpl();

test("should parse basic url", () => {
  const url = "https://google.com/example/path";

  const normalized = service.normalizeUrl(url, true);
  const result = service.parseUrl(normalized);

  expect(result.websiteId).toEqual("google.com");
  expect(result.pageId).toEqual("%2Fexample%2Fpath");
});

test("should throw if not url", () => {
  const url = "this is not an url";

  expect(() => {
    service.parseUrl(url);
  }).toThrow();
});

test("should not throw if no protocol in url", () => {
  const url = "google.com/example/path";

  const normalized = service.normalizeUrl(url, true);
  const result = service.parseUrl(normalized);

  expect(result.websiteId).toEqual("google.com");
  expect(result.pageId).toEqual("%2Fexample%2Fpath");
});

test("should return same ids for http and https", () => {
  const httpUrl = "http://google.com/example/path";
  const httpsUrl = "https://google.com/example/path";

  const normalizedHttp = service.normalizeUrl(httpUrl, true);
  const httpResult = service.parseUrl(normalizedHttp);

  const normalizedHttps = service.normalizeUrl(httpsUrl, true);
  const httpsResult = service.parseUrl(normalizedHttps);

  expect(httpResult.websiteId).toEqual(httpsResult.websiteId);
  expect(httpResult.pageId).toEqual(httpsResult.pageId);
});

test("should escape special characters in pageId", () => {
  // characters '?' and '#' are also escaped but cannot be the pathname part
  const shouldEscape = [
    ";",
    ",",
    "/",
    ":",
    "@",
    "&",
    "=",
    "+",
    "$",
    "!",
    "'",
    "(",
    ")",
    "*",
  ];
  const shouldNotEscape = ["-", "_", ".", "~", "A", "Z", "a", "z", "1", "0"];

  let url = "https://google.com/";
  shouldEscape.forEach((c) => (url += c));
  shouldNotEscape.forEach((c) => (url += c));

  const normalized = service.normalizeUrl(url, true);
  const result = service.parseUrl(normalized);

  expect(result.websiteId).toEqual("google.com");
  shouldEscape.forEach((c) => expect(result.pageId).not.toContainEqual(c));
  shouldNotEscape.forEach((c) => expect(result.pageId).toContainEqual(c));
});

test("should generate not empty pathId for main domain page", () => {
  const url = "https://google.com";

  const normalized = service.normalizeUrl(url, true);
  const result = service.parseUrl(normalized);

  expect(result.websiteId).toEqual("google.com");
  expect(result.pageId).toEqual("%2F");
});

test("should ignore trailing slash for not empty pageId", () => {
  const urlWithSlash = "https://google.com/path/";
  const urlWithoutSlash = "https://google.com/path";

  const normalizedWithSlash = service.normalizeUrl(urlWithSlash, true);
  const resultWithSlash = service.parseUrl(normalizedWithSlash);
  
  const normalizedWithoutSlash = service.normalizeUrl(urlWithoutSlash, true);
  const resultWithoutSlash = service.parseUrl(normalizedWithoutSlash);

  expect(resultWithSlash.pageId).toEqual(resultWithoutSlash.pageId);
});

test("should ignore user info, port, query and fragment in websiteId and pageId", () => {
  const url = "https://username:pass@google.com:8860/example/path?q=val#elId";

  const normalized = service.normalizeUrl(url, true);
  const result = service.parseUrl(normalized);

  expect(result.websiteId).toEqual("google.com");
  expect(result.pageId).toEqual("%2Fexample%2Fpath");
});

test("should ignore www", () => {
  const url = "https://www.google.com/example/path?q=val#elId";

  const normalized = service.normalizeUrl(url, true);
  const result = service.parseUrl(normalized);

  expect(result.websiteId).toEqual("google.com");
  expect(result.pageId).toEqual("%2Fexample%2Fpath");
});
