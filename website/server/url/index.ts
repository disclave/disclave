import {UrlService} from "./UrlService";

export interface ParsedUrlData {
  raw: string,
  websiteId: string,
  pageId: string
}

export interface IUrlService {
  parseUrl(raw: String): ParsedUrlData
}

let service: IUrlService = new UrlService()
export const setUrlService = (instance: IUrlService) => {
  service = instance
}
export const getUrlService = (): IUrlService => service
