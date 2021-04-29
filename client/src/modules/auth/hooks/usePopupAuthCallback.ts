import { useEffect } from "react";
import { UserModel } from "../models";

type AuthCallback = (user: UserModel) => void;

export const usePopupAuthCallback = (callback: AuthCallback) => {
  useEffect(() => {
    if (!window) {
      console.error(
        "Window not available. Can not initialize message listener."
      );
      return;
    }

    const eventListener = (ev: MessageEvent) => {
      // TODO: get domain from init props
      if (ev.origin != process.env.DOMAIN) return;

      const data = JSON.parse(ev.data);
      if (data.type != "SESSION") return;

      const msgUser = data.content?.user;
      callback(msgUser);
    };

    window.addEventListener("message", eventListener, false);
    return () => {
      window.removeEventListener("message", eventListener);
    };
  }, []);
};
