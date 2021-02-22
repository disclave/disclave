import {findMessagesByWebsiteIdAndPageId, MessageEntity, saveMessage} from "./ChatRepository";
import { v4 as uuidv4 } from 'uuid'

export interface MessageResponse {
  id: string,
  text: string
}

export interface MessageRequest {
  text: string
}

export const getMessages = async (websiteId: string, pageId: string): Promise<Array<MessageResponse>> => {
  const entities = await findMessagesByWebsiteIdAndPageId(websiteId, pageId)
  return entities.map(entityToResponse)
}

export const postMessage = async (message: MessageRequest, websiteId: string, pageId: string): Promise<MessageResponse> => {
  const entity = await saveMessage({
    id: uuidv4(),
    text: message.text
  }, websiteId, pageId)

  return entityToResponse(entity)
}

const entityToResponse = (entity: MessageEntity): MessageResponse => {
  return {
    id: entity.id,
    text: entity.text
  }
}
