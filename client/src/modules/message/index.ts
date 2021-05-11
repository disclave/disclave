export enum MessageType {
  SESSION = "SESSION",
  WINDOW_HEIGHT = "disclave-window-height",
}

export type { Message, EventListener } from "./message";
export {
  sendMessage,
  canInitializeMessageListener,
  addMessageListener,
  removeMessageListener,
} from "./message";
