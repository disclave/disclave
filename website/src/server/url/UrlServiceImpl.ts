import { UrlService, ParsedUrlData } from './index';
import { injectable } from 'inversify';

@injectable()
export class UrlServiceImpl implements UrlService {
  public parseUrl(raw: string): ParsedUrlData {
    const url = new URL(raw);
    return {
      raw,
      websiteId: encodeURI(url.hostname),
      pageId: encodeURI(url.pathname)
    };
  }
}

const encodeURI = (str: string): string => {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));
};
