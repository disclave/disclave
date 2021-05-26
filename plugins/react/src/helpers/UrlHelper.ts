export interface IframeConfig {
  hideVotes: boolean;
}

export const getIframeUrl = (href: string, config: IframeConfig): string => {
  const iframeUrl = process.env.IFRAME_URL as string;
  let url = iframeUrl.replace("{{url}}", encodeURI(href));
  if (config.hideVotes) url += "?hideVotes";
  return url;
};

const encodeURI = (str: string): string => {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16)
  );
};
