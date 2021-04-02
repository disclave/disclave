export const getIframeUrl = (href: string): string => {
  const url = process.env.IFRAME_URL as string;
  return url.replace("{{url}}", encodeURI(href));
};

const encodeURI = (str: string): string => {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16)
  );
};
