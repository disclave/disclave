import {MessageService} from "./MessageService";
import {Message} from "./Message";

const service = new MessageService();

export const resolvers = {
  Query: {
    getMessages: async (_, args) => {
      const messages = await service.getMessages(
        args.url
      )
      return messages.map(messageToResponse)
    }
  },
  Mutation: {
    createMessage: async (_, args) => {
      const message = await service.addMessage(
        args.message.text,
        args.message.url
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