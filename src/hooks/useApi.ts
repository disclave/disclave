import {IWebsiteInfo} from "../adapters/website";
import {getAdapter, IApiAdapter} from "../adapters/api";

export const useApi = (websiteInfo: IWebsiteInfo | null): IApiAdapter | null => {
  if (!websiteInfo)
    return null;

  return getAdapter(websiteInfo)
}
