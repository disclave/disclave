import {CommentRepository} from "../../../server/comments/db";
import {CommentRepositoryMock} from "../../mocks/CommentRepositoryMock";
import {UserService} from "../../../server/users";
import {UserServiceMock} from "../../mocks/UserServiceMock";
import {UrlService} from "../../../server/url";
import {Container} from "inversify";
import {UrlServiceImpl} from "../../../server/url/UrlServiceImpl";
import {CommentService} from "../../../server/comments";
import {CommentServiceImpl} from "../../../server/comments/CommentServiceImpl";


describe("Testing CommentService", () => {

  const container = new Container()
  const urlService = new UrlServiceImpl()

  container.bind(UrlService).toConstantValue(urlService)
  container.bind(UserService).to(UserServiceMock)
  container.bind(CommentRepository).to(CommentRepositoryMock)

  container.bind<CommentService>(CommentServiceImpl).toSelf()
  const service = container.get<CommentService>(CommentServiceImpl)

  test('should add and return comment', async () => {
    const idToken = 'id-token'
    const text = 'Comment text!'
    const url = 'https://google.com/example/path?q=123#bb'
    const parsedUrl = urlService.parseUrl(url)

    const result = await service.addComment(idToken, text, url)

    expect(result.id).not.toBeNull()
    expect(result.id).not.toBe('')
    expect(result.text).toEqual(text)
    expect(result.timestamp).toEqual(CommentRepositoryMock.mockDate.toISOString())
    expect(result.urlMeta.websiteId).toEqual(parsedUrl.websiteId)
    expect(result.urlMeta.pageId).toEqual(parsedUrl.pageId)
    expect(result.author.id).toEqual(UserServiceMock.defaultUserProfile.id)
    expect(result.author.name).toEqual(UserServiceMock.defaultUserProfile.name)
  })

  // TODO add tests
})