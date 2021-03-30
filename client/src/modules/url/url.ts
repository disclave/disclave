export const stringToUrl = (str: string): string => {
  try {
    new URL(str);
  } catch (e) {
    console.error(e);
  }

  return str;
};

export const encodeUrl = (url: string): string => {
  return encodeURIComponent(url).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16)
  );
};
