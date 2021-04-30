export enum MessageType {
  SESSION = "SESSION",
}

export type { Message, EventListener } from "./message";
export {
  sendMessage,
  canInitializeMessageListener,
  addMessageListener,
  removeMessageListener,
} from "./message";
