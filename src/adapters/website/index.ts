import {ChromeAdapter} from "./ChromeAdapter";

export interface IWebsiteInfo {
  url: URL
}

export interface IWebsiteAdapter {
  getCurrentWebsiteInfo(): Promise<IWebsiteInfo>;
}

export const getAdapter = (): IWebsiteAdapter => {
  return new ChromeAdapter();
}
