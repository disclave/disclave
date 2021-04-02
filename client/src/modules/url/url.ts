import normalizeUrl from "normalize-url";

export const isUrl = (str: string | undefined): boolean => {
  try {
    normalizeUrl(str);
  } catch {
    return false;
  }
  return true;
};

export const stringToUrl = (str: string): string => normalizeUrl(str);

export const encodeUrl = (url: string): string => {
  return encodeURIComponent(url).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16)
  );
};
