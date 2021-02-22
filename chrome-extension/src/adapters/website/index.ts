export interface IWebsiteInfo {
  url: URL
}

export interface IWebsiteAdapter {
  getCurrentWebsiteInfo(): Promise<IWebsiteInfo>;
}

let websiteAdapter: IWebsiteAdapter | null = null

export const setAdapter = (adapterInterface: IWebsiteAdapter) => {
  websiteAdapter = adapterInterface
}

export const getAdapter = (): IWebsiteAdapter => {
  if (websiteAdapter == null)
    throw `Website adapter not configured`

  return websiteAdapter
}