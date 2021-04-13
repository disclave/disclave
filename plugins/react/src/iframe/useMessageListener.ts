import { useEffect } from "react";

export const useMessageListener = (callback: (ev: MessageEvent) => void) => {
  useEffect(() => {
    if (!window) {
      console.error("Window not available. Can not initialize message listener.");
      return;
    }

    const eventListener = (ev: MessageEvent) => {
      callback(ev);
    };

    window.addEventListener("message", eventListener, false);
    return () => {
      window.removeEventListener("message", eventListener);
    };
  }, []);
};
