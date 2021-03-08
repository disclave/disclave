import {userRepositoryPort} from "../../../server/users/db";
import {UserRepositoryMock} from "../../mocks/UserRepositoryMock";

describe("Testing UserService with mocked repository", () => {
  beforeEach(() => {
    userRepositoryPort.set(UserRepositoryMock)
  })

  afterEach(() => {
    userRepositoryPort.reset()
  })

  // TODO add tests
})