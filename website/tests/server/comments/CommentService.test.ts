import {commentRepositoryPort} from "../../../server/comments/db";
import {CommentRepositoryMock} from "../../mocks/CommentRepositoryMock";
import {userServicePort} from "../../../server/users";
import {UserServiceMock} from "../../mocks/UserServiceMock";
import {commentServicePort} from "../../../server/comments";
import {urlServicePort} from "../../../server/url";


describe("Testing CommentService", () => {

  beforeEach(() => {
    commentRepositoryPort.set(CommentRepositoryMock)
    userServicePort.set(UserServiceMock)
  })

  afterEach(() => {
    userServicePort.reset()
    commentRepositoryPort.reset()
  })

  test('should add and return comment', async () => {
    const idToken = 'id-token'
    const text = 'Comment text!'
    const url = 'https://google.com/example/path?q=123#bb'
    const parsedUrl = urlServicePort.get().parseUrl(url)

    const service = commentServicePort.get()
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