import {ChatService} from "../../../src";
import {ChatRepositoryMock} from "../../mocks/ChatRepositoryMock";

describe('ChatService', () => {
  const repository = new ChatRepositoryMock()
  const service = new ChatService(repository)

  afterEach(() => {
    repository.deleteAll()
  })

  test('should add message', async () => {
    const request = {
      text: 'Test message',
      websiteId: 'website-1',
      pageId: 'page-1'
    }

    const result = await service.postMessage(request)

    expect(result.id).not.toBeNull()
    expect(result.id).not.toBe('')
    expect(result.text).toEqual(request.text)
    expect(result.websiteId).toEqual(request.websiteId)
    expect(result.pageId).toEqual(request.pageId)
  })

  test('should return messages list', async () => {
    const websiteId = 'website-1'
    const pageId = 'page-1'
    const request1 = { text: 'Test message 1', websiteId, pageId }
    const request2 = { text: 'Test message 2', websiteId, pageId }

    const result1 = await service.postMessage(request1)
    const result2 = await service.postMessage(request2)
    const resultAll = await service.getMessages(websiteId, pageId)

    expect(resultAll).toHaveLength(2)
    expect(resultAll).toContainEqual(result1)
    expect(resultAll).toContainEqual(result2)
  })

  // TODO: add tests to verify getMessages with different website and page ids
})
