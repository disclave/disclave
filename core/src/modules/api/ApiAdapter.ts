export interface IApiAdapter {
  // add methods like 'getComments(websiteId, pageId)'
}

let apiAdapter: IApiAdapter | null = null

export const setApiAdapter = (adapterInterface: IApiAdapter) => {
  apiAdapter = adapterInterface
}

export const getApiAdapter = (): IApiAdapter => {
  if (apiAdapter == null)
    throw `API adapter not configured`

  return apiAdapter
}
