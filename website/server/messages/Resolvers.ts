import {MessageService} from "./MessageService";

const service = new MessageService();

export const resolvers = {
  Query: {
    getMessages: async (_, args) => {
      const messages = await service.getMessages(args.websiteId, args.pageId)
      return messages.map(m => ({
        id: m.id,
        text: m.text,
        websiteId: m.websiteId,
        pageId: m.pageId
      }))
    }
  }
}