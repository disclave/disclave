import {MessageService} from "./MessageService";
import {Message} from "./Message";

const service = new MessageService();

export const resolvers = {
  Query: {
    getMessages: async (_, args) => {
      const messages = await service.getMessages(
        args.websiteId,
        args.pageId
      )
      return messages.map(messageToResponse)
    }
  },
  Mutation: {
    createMessage: async (_, args) => {
      const message = await service.addMessage(
        args.message.text,
        args.message.websiteId,
        args.message.pageId
      )
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