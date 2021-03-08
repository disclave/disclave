import { UrlServiceImpl } from '../../../server/url/UrlServiceImpl';

const service = new UrlServiceImpl();

test('should parse basic url', () => {
  const url = 'https://google.com/example/path';

  const result = service.parseUrl(url);

  expect(result.raw).toEqual(url);
  expect(result.websiteId).toEqual('google.com');
  expect(result.pageId).toEqual('%2Fexample%2Fpath');
});

test('should throw if no protocol in url', () => {
  const url = 'google.com/example/path';

  expect(() => {
    service.parseUrl(url);
  }).toThrow();
});

test('should return same ids for http and https', () => {
  const httpUrl = 'http://google.com/example/path';
  const httpsUrl = 'https://google.com/example/path';

  const httpResult = service.parseUrl(httpUrl);
  const httpsResult = service.parseUrl(httpsUrl);

  expect(httpResult.raw).toEqual(httpUrl);
  expect(httpsResult.raw).toEqual(httpsUrl);
  expect(httpResult.websiteId).toEqual(httpsResult.websiteId);
  expect(httpResult.pageId).toEqual(httpsResult.pageId);
});

test('should escape special characters in pageId', () => {
  // characters '?' and '#' are also escaped but cannot be the pathname part
  const shouldEscape = [';', ',', '/', ':', '@', '&', '=', '+', '$', '!', "'", '(', ')', '*'];
  const shouldNotEscape = ['-', '_', '.', '~', 'A', 'Z', 'a', 'z', '1', '0'];

  let url = 'https://google.com/';
  shouldEscape.forEach((c) => (url += c));
  shouldNotEscape.forEach((c) => (url += c));

  const result = service.parseUrl(url);

  expect(result.raw).toEqual(url);
  expect(result.websiteId).toEqual('google.com');
  shouldEscape.forEach((c) => expect(result.pageId).not.toContainEqual(c));
  shouldNotEscape.forEach((c) => expect(result.pageId).toContainEqual(c));
});

test('should generate not empty pathId for main domain page', () => {
  const url = 'https://google.com';

  const result = service.parseUrl(url);

  expect(result.raw).toEqual(url);
  expect(result.websiteId).toEqual('google.com');
  expect(result.pageId).toEqual('%2F');
});

test('should not ignore trailing slash for not empty pageId', () => {
  const urlWithSlash = 'https://google.com/path/';
  const urlWithoutSlash = 'https://google.com/path';

  const resultWithSlash = service.parseUrl(urlWithSlash);
  const resultWithoutSlash = service.parseUrl(urlWithoutSlash);

  expect(resultWithSlash.pageId).not.toEqual(resultWithoutSlash.pageId);
});

test('should ignore user info, port, query and fragment in websiteId and pageId', () => {
  const url = 'https://username:pass@google.com:8860/example/path?q=val#elId';

  const result = service.parseUrl(url);

  expect(result.raw).toEqual(url);
  expect(result.websiteId).toEqual('google.com');
  expect(result.pageId).toEqual('%2Fexample%2Fpath');
});
