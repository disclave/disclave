import {UserRepositoryMock} from "./UserRepositoryMock";
import {userRepositoryPort} from "../../../server/users/db";

describe("Testing UserService with mocked repository", () => {
  beforeEach(() => {
    userRepositoryPort.set(UserRepositoryMock)
  })

  afterEach(() => {
    userRepositoryPort.reset()
  })

  // TODO add tests
})