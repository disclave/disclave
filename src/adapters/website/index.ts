import {ChromeAdapter} from "./ChromeAdapter";

export interface IWebsiteInfo {
  url: URL
}

export interface IWebsiteAdapter {
  getCurrentWebsiteInfo(): Promise<IWebsiteInfo>;
}

export function getAdapter(): IWebsiteAdapter {
  return new ChromeAdapter();
}
