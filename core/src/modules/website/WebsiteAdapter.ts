export interface IWebsiteInfo {
  url: URL
}

export interface IWebsiteAdapter {
  getCurrentWebsiteInfo(): Promise<IWebsiteInfo>;
}

let websiteAdapter: IWebsiteAdapter | null = null

export const setWebsiteAdapter = (adapterInterface: IWebsiteAdapter) => {
  websiteAdapter = adapterInterface
}

export const getWebsiteAdapter = (): IWebsiteAdapter => {
  if (websiteAdapter == null)
    throw `Website adapter not configured`

  return websiteAdapter
}
