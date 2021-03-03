import {MessageEntity} from "./MessageEntity";

export class MessageRepository {
  public async findMessages(websiteId: string, pageId: string): Promise<Array<MessageEntity>> {
    return [
      {
        id: "id",
        text: "text",
        websiteId: "website",
        pageId: "page"
      }
    ]
  }

  public async saveMessage(entity: MessageEntity): Promise<MessageEntity> {
    return entity
  }
}
