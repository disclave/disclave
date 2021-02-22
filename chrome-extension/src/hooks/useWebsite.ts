import {useEffect, useState} from "react";
import {getAdapter, IWebsiteInfo} from "../adapters/website";

export const useWebsite = (): IWebsiteInfo | null => {
  const [websiteInfo, setWebsiteInfo] = useState<IWebsiteInfo | null>(null);

  useEffect(() => {
    const updateWebsiteInfo = async () => {
      const adapter = getAdapter();
      const info = await adapter.getCurrentWebsiteInfo();
      setWebsiteInfo(info)
    }

    updateWebsiteInfo();
  }, []);

  return websiteInfo;
}
