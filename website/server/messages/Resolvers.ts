import {MessageService} from "./MessageService";
import {Message} from "./Message";

const service = new MessageService();

export const resolvers = {
  Query: {
    getMessages: async (_, args) => {
      const messages = await service.getMessages(args.websiteId, args.pageId)
      return messages.map(messageToResponse)
    }
  },
  Mutation: {
    addMessage: async (_, args) => {
      const message = await service.addMessage(args.text, args.websiteId, args.pageId)
      return messageToResponse(message)
    }
  }
}

const messageToResponse = (message: Message) => {
  return {
    id: message.id,
    text: message.text,
    websiteId: message.websiteId,
    pageId: message.pageId
  }
}