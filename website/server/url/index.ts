import {UrlService} from "./UrlService";
import {Port} from "../../helpers/Port";

export interface ParsedUrlData {
  raw: string,
  websiteId: string,
  pageId: string
}

export interface IUrlService {
  parseUrl(raw: String): ParsedUrlData
}

export const urlServicePort = new Port<IUrlService>(UrlService)
