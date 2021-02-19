import {useWebsite} from "./useWebsite";
import {useApi} from "./useApi";
import {Chat, Message} from "../modules/chat";
import {useEffect, useState} from "react";

type UseChat = [
  Array<Message>,
  (text: string) => Promise<void>,
]

export const useChat = (): UseChat => {
  const websiteInfo = useWebsite();
  const api = useApi(websiteInfo);

  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    if (!!api)
      setChat(new Chat(api));
    else
      setChat(null);
  }, [api])

  useEffect(() => {
    if (chat == null)
      setMessages([]);
    else
      setMessages(chat.getMessages())
  }, [chat])

  const addMessage = async (text: string) => {
    // TODO:
  }

  return [messages, addMessage];
}
