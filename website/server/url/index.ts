import {UrlService} from "./UrlService";

export interface ParsedUrlData {
  raw: string,
  websiteId: string,
  pageId: string
}

export interface IUrlService {
  parseUrl(raw: String): ParsedUrlData
}

export const urlServiceManager = new DependencyManager<IUrlService>(new UrlService())
