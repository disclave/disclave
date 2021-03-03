export interface MessageResponse {
  id: string,
  text: string,
  websiteId: string,
  pageId: string
}

export interface MessageRequest {
  text: string,
  websiteId: string,
  pageId: string
}

export interface Message {
  id: string,
  text: string
}

export interface IChatRepository {
  findMessagesByWebsiteIdAndPageId(websiteId: string, pageId: string): Promise<Array<Message>>

  saveMessage(message: Message, websiteId: string, pageId: string): Promise<Message>
}

export class ChatService {
  constructor(private repository: IChatRepository) {
  }

  async getMessages(websiteId: string, pageId: string): Promise<Array<MessageResponse>> {
    const result = await this.repository.findMessagesByWebsiteIdAndPageId(websiteId, pageId)
    return result.map(m => this.domainToResponse(m, websiteId, pageId))
  }

  async postMessage(request: MessageRequest): Promise<MessageResponse> {
    const result = await this.repository.saveMessage({
      id: '',
      text: request.text
    }, request.websiteId, request.pageId)

    return this.domainToResponse(result, request.websiteId, request.pageId)
  }

  private domainToResponse(domain: Message, websiteId: string, pageId: string): MessageResponse {
    return {
      id: domain.id,
      text: domain.text,
      websiteId: websiteId,
      pageId: pageId
    }
  }
}


