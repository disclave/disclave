import {IWebsiteInfo} from "../website";

export interface IApiAdapter {
  // add methods like 'getComments(websiteId, pageId)'
}

let apiAdapter: IApiAdapter | null = null

export const setAdapter = (adapterInterface: IApiAdapter) => {
  apiAdapter = adapterInterface
}

export const getAdapter = (websiteInfo: IWebsiteInfo): IApiAdapter => {
  if (apiAdapter == null)
    throw `API adapter not configured`

  return apiAdapter
}