import normalizeUrl from "normalize-url";

const urlPattern = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
); // fragment locator

export const isUrl = (str: string | undefined): boolean => {
  return !!str && !!urlPattern.test(str);
};

export const stringToUrl = (str: string): string => normalizeUrl(str);

export const encodeUrl = (url: string): string => {
  // TODO: currently simplified because of the iOS problems - verify and update later
  return encodeURIComponent(url);
  // return encodeURIComponent(url).replace(
  //   /[!'()*]/g,
  //   (c) => "%" + c.charCodeAt(0).toString(16)
  // );
};
