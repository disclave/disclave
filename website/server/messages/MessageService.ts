import {Message} from "./Message";
import {MessageRepository} from "./db/MessageRepository";
import {MessageEntity} from "./db/MessageEntity";

const repository = new MessageRepository()

export class MessageService {
  public async getMessages(websiteId: string, pageId: string): Promise<Array<Message>> {
    const messages = await repository.findMessages(websiteId, pageId)
    return messages.map(MessageService.toDomain)
  }

  public async addMessage(text: string, websiteId: string, pageId: string): Promise<Message> {
    const result = await repository.saveMessage({
      id: '',
      text,
      websiteId,
      pageId
    })
    return MessageService.toDomain(result)
  }

  private static toDomain(entity: MessageEntity): Message {
    return {
      id: entity.id,
      text: entity.text,
      websiteId: entity.websiteId,
      pageId: entity.pageId
    }
  }

  private static toEntity(domain: Message): MessageEntity {
    return {
      id: domain.id,
      text: domain.text,
      websiteId: domain.websiteId,
      pageId: domain.pageId
    }
  }
}