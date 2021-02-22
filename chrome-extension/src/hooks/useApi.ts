import {getApiAdapter, IApiAdapter} from "@webchat/core";

export const useApi = (): IApiAdapter => {
  return getApiAdapter()
}
