import { useEffect } from "react";
import { UserModel, SessionMessage } from "../models";
import {
  addMessageListener,
  canInitializeMessageListener,
  MessageType,
  removeMessageListener,
} from "../../message";

type AuthCallback = (user: UserModel, authToken: string) => void;

export const usePopupAuthCallback = (callback: AuthCallback) => {
  useEffect(() => {
    if (!canInitializeMessageListener()) {
      console.error(
        "Window not available. Can not initialize message listener."
      );
      return;
    }

    const messageListener = addMessageListener(
      MessageType.SESSION,
      (data: SessionMessage) => callback(data.user, data.authToken)
    );
    return () => {
      removeMessageListener(messageListener);
    };
  }, []);
};
