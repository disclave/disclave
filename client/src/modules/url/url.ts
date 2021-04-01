export const isUrl = (str: string | undefined): boolean => {
  if (!str || !str.length) return false;
  try {
    new URL(str);
  } catch {
    return false;
  }
  return true;
};

export const stringToUrl = (str: string): string => {
  if (!isUrl(str)) throw "Invalid url";

  return str;
};

export const encodeUrl = (url: string): string => {
  return encodeURIComponent(url).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16)
  );
};
