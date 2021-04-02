import { isUrl } from "../../../src";

test("should be true for basic url", () => {
  const url = "https://google.com/example/path";
  const result = isUrl(url);
  expect(result).toBeTruthy();
});

test("should be false if not url", () => {
  const url = "this is not an url";
  const result = isUrl(url);
  expect(result).toBeFalsy();
});

test("should be true if no protocol in url", () => {
  const url = "google.com/example/path";
  const result = isUrl(url);
  expect(result).toBeTruthy();
});

test("should be true for http", () => {
  const httpUrl = "http://google.com/example/path";
  const result = isUrl(httpUrl);
  expect(result).toBeTruthy();
});

test("should be true without trailing slas", () => {
  const url = "https://google.com";
  const result = isUrl(url);
  expect(result).toBeTruthy();
});

test("should be true with trailing slash", () => {
  const urlWithSlash = "https://google.com/path/";
  const result = isUrl(urlWithSlash);
  expect(result).toBeTruthy();
});

test("should be true with www", () => {
  const url = "https://www.google.com/example/path?q=val#elId";
  const result = isUrl(url);
  expect(result).toBeTruthy();
});
