import { useEffect, useState } from "react";

interface ActiveTab {
  url: string;
}

export const useActiveTab = (): ActiveTab | null => {
  const [tab, setTab] = useState<ActiveTab | null>(null);

  // TODO: what if tab url is changed?
  useEffect(() => {
    const getActiveTab = async () => {
      const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      setTab({
        url: activeTab.url,
      });
    };

    getActiveTab();
  }, []);

  return tab;
};
