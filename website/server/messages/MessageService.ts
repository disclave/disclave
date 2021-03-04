import {Message} from "./Message";
import {MessageRepository} from "./db/MessageRepository";
import {MessageEntity} from "./db/MessageEntity";

const repository = new MessageRepository()

export class MessageService {
  public async getMessages(url: string): Promise<Array<Message>> {
    const parsedUrl = parseUrl(url)
    const messages = await repository.findMessages(parsedUrl.websiteId, parsedUrl.pageId)
    return messages.map(toDomain)
  }

  public async addMessage(text: string, url: string): Promise<Message> {
    const parsedUrl = parseUrl(url)
    const result = await repository.saveMessage(text, parsedUrl.websiteId, parsedUrl.pageId)
    return toDomain(result)
  }
}

interface WebsitePageId {
  websiteId: string,
  pageId: string
}

const parseUrl = (urlString: string): WebsitePageId => {
  const url = new URL(urlString)
  return {
    websiteId: encodeURI(url.hostname),
    pageId: encodeURI(url.pathname)
  }
}

const encodeURI = (str: string): string => {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16))
}

const toDomain = (entity: MessageEntity): Message => {
  return {
    id: entity.id,
    text: entity.text,
    websiteId: entity.websiteId,
    pageId: entity.pageId
  }
}
