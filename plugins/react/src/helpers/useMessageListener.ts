import { useEffect } from "react";

export const useMessageListener = (callback: (ev: any) => void) => {
  useEffect(() => {
    const eventListener = (ev: MessageEvent) => {
      callback(ev);
    };

    window.addEventListener("message", eventListener, false);
    return () => {
      window.removeEventListener("message", eventListener);
    };
  }, []);
};
