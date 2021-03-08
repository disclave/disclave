import {ICommentRepository} from "../../../server/comments/db";
import {CommentRepositoryMock} from "../../mocks/CommentRepositoryMock";
import {IUserService} from "../../../server/users";
import {UserServiceMock} from "../../mocks/UserServiceMock";
import {IUrlService} from "../../../server/url";
import {Container} from "inversify";
import {TYPES} from "../../../server/types";
import {UrlService} from "../../../server/url/UrlService";
import {ICommentService} from "../../../server/comments";
import {CommentService} from "../../../server/comments/CommentService";


describe("Testing CommentService", () => {

  const container = new Container()
  container.bind<IUrlService>(TYPES.IUrlService).to(UrlService)
  container.bind<IUserService>(TYPES.IUserService).to(UserServiceMock)
  container.bind<ICommentRepository>(TYPES.ICommentRepository).to(CommentRepositoryMock)

  container.bind<ICommentService>(CommentService).toSelf()
  const service = container.get<ICommentService>(CommentService)

  test('should add and return comment', async () => {
    const idToken = 'id-token'
    const text = 'Comment text!'
    const url = 'https://google.com/example/path?q=123#bb'
    const parsedUrl = container.get<IUrlService>(TYPES.IUrlService).parseUrl(url)

    const result = await service.addComment(idToken, text, url)

    expect(result.id).not.toBeNull()
    expect(result.id).not.toBe('')
    expect(result.text).toEqual(text)
    expect(Date.parse(result.timestamp)).toEqual(CommentRepositoryMock.mockDate)
    expect(result.urlMeta.websiteId).toEqual(parsedUrl.websiteId)
    expect(result.urlMeta.pageId).toEqual(parsedUrl.pageId)
    expect(result.author.id).toEqual(UserServiceMock.defaultUserProfile.id)
    expect(result.author.name).toEqual(UserServiceMock.defaultUserProfile.name)
  })

  // TODO add tests
})