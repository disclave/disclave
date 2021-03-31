import { useEffect, useState } from "react";

interface ActiveTab {
  url: string;
}

// TODO: change to build-in promise after migration to manifest v3
const getChromeActiveTab = (): Promise<chrome.tabs.Tab> => {
  return new Promise<chrome.tabs.Tab>((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => resolve(tabs[0])
    );
  });
};

export const useActiveTab = (): ActiveTab | null => {
  const [tab, setTab] = useState<ActiveTab | null>(null);

  // TODO: what if tab url is changed?
  useEffect(() => {
    const getActiveTab = async () => {
      const activeTab = await getChromeActiveTab();
      setTab({
        url: activeTab.url,
      });
    };

    getActiveTab();
  }, []);

  return tab;
};
