
// TODO: use real database
const DB = new Map<string, Map<string, Array<MessageEntity>>>()

export interface MessageEntity {
  id: string,
  text: string
}

export const findMessagesByWebsiteIdAndPageId = async (websiteId: string, pageId: string): Promise<Array<MessageEntity>> => {
  return DB.get(websiteId)?.get(pageId) ?? []
}

export const saveMessage = async (message: MessageEntity, websiteId: string, pageId: string): Promise<MessageEntity> => {
  if (!DB.has(websiteId))
    DB.set(websiteId, new Map<string, Array<MessageEntity>>())

  const website = DB.get(websiteId)!
  if (!website.has(pageId))
    website.set(pageId, new Array<MessageEntity>())

  const page = website.get(pageId)!
  page.push(message)

  return message
}
