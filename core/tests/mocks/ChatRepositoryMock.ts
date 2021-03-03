import {IChatRepository, Message} from "../../src";
import {v4 as uuidv4} from 'uuid'

const DB = new Map<string, Map<string, Array<MessageEntity>>>()

interface MessageEntity {
  id: string,
  text: string
}

export class ChatRepositoryMock implements IChatRepository {
  async findMessagesByWebsiteIdAndPageId(websiteId: string, pageId: string): Promise<Array<Message>> {
    const result = DB.get(websiteId)?.get(pageId) ?? []
    return result.map(m => {
      return {
        id: m.id,
        text: m.text
      }
    })
  }

  async saveMessage(message: Message, websiteId: string, pageId: string): Promise<Message> {
    message.id = uuidv4()

    if (!DB.has(websiteId))
      DB.set(websiteId, new Map<string, Array<MessageEntity>>())

    const website = DB.get(websiteId)!
    if (!website.has(pageId))
      website.set(pageId, new Array<MessageEntity>())

    const page = website.get(pageId)!
    page.push(message)

    return message
  }

  deleteAll() {
    DB.clear()
  }
}
