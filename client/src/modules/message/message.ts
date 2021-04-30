import { getDomain } from "../config";
import { MessageType } from "./index";

export interface Message<T = unknown> {
  type: MessageType;
  content: T;
}

export type EventListener = (ev: MessageEvent) => void;

export const sendMessage = <T>(
  target: Window,
  type: MessageType,
  content: T,
  crossOrigin: boolean = false
) => {
  if (!crossOrigin && target.origin != getDomain()) return;

  const message: Message<T> = {
    type,
    content,
  };
  const targetOrigin = crossOrigin ? "*" : getDomain();
  target.postMessage(JSON.stringify(message), targetOrigin);
};

export const canInitializeMessageListener = (): boolean => {
  return !!window;
};

export const addMessageListener = <T>(
  type: MessageType,
  callback: (data: T) => void
) => {
  const eventListener = (ev: MessageEvent) => {
    if (ev.origin != getDomain()) return;

    const data = JSON.parse(ev.data);
    if (data.type != type || !data.content) return;

    callback(data.content);
  };

  window.addEventListener("message", eventListener, false);
  return eventListener;
};

export const removeMessageListener = (listener: EventListener) => {
  window.removeEventListener("message", listener);
};
