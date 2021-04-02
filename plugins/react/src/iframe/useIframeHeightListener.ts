import { useMessageListener } from "./useMessageListener";
import { useState } from "react";

const windowHeightEventType = "disclave-window-height";

export const useIframeHeightListener = (initialHeight: string): string => {
  const [iframeHeight, setIframeHeight] = useState<string>(initialHeight);

  const parseMessage = (ev: MessageEvent) => {
    const data = JSON.parse(ev.data);
    if (data.type == windowHeightEventType) setIframeHeight(data.height);
  };

  useMessageListener((ev) => parseMessage(ev));

  return iframeHeight;
};
