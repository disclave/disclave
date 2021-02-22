import {useEffect, useState} from "react";
import {getWebsiteAdapter, IWebsiteInfo} from "@webchat/core";

export const useWebsite = (): IWebsiteInfo | null => {
  const [websiteInfo, setWebsiteInfo] = useState<IWebsiteInfo | null>(null);

  useEffect(() => {
    const updateWebsiteInfo = async () => {
      const adapter = getWebsiteAdapter();
      const info = await adapter.getCurrentWebsiteInfo();
      setWebsiteInfo(info)
    }

    updateWebsiteInfo();
  }, []);

  return websiteInfo;
}
