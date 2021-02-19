import {IWebsiteInfo} from "../website";

export interface IApiAdapter {
  // add methods like 'getComments(websiteId, pageId)'
}

export const getAdapter = (websiteInfo: IWebsiteInfo): IApiAdapter => {
  return {

  }
}