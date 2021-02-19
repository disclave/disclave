import {IWebsiteInfo} from "../website";

export interface IApiAdapter {
  // add methods like 'getComments(websiteId, pageId)'
}

export function getAdapter(websiteInfo: IWebsiteInfo): IApiAdapter {
  return {}
}