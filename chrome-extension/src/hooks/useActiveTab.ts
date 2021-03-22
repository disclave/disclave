import { useEffect, useState } from "react";

export const useActiveTab = (): chrome.tabs.Tab | null => {
  const [tab, setTab] = useState<chrome.tabs.Tab | null>(null);

  useEffect(() => {
    const getActiveTab = async () => {
      const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      setTab(activeTab);
    };

    getActiveTab();
  });

  return tab;
};
