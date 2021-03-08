import {commentRepositoryPort} from "../../../server/comments/db";
import {CommentRepositoryMock} from "../../mocks/CommentRepositoryMock";
import {userServicePort} from "../../../server/users";
import {UserServiceMock} from "../../mocks/UserServiceMock";


describe("Testing CommentService", () => {
  beforeEach(() => {
    commentRepositoryPort.set(CommentRepositoryMock)
    userServicePort.set(UserServiceMock)
  })

  afterEach(() => {
    userServicePort.reset()
    commentRepositoryPort.reset()
  })

  // TODO add tests
})