import { UserService } from "../../../src/users";
import { Container } from "inversify";
import { AuthProvider } from "../../../src/auth";
import { AuthProviderMock } from "../../mocks/AuthProviderMock";
import { UserRepository } from "../../../src/users/db";
import { UserRepositoryMock } from "../../mocks/UserRepositoryMock";
import { UserServiceImpl } from "../../../src/users/UserServiceImpl";

describe("Testing UserService", () => {
  const container = new Container();

  container.bind(AuthProvider).to(AuthProviderMock);
  container.bind(UserRepository).to(UserRepositoryMock);

  container.bind<UserService>(UserServiceImpl).toSelf();
  const service = container.get<UserService>(UserServiceImpl);

  test("should return user id from verifyIdToken method", async () => {
    const idToken = "id-token";

    const result = await service.verifyIdToken(idToken);

    expect(result).toEqual(AuthProviderMock.tokenMock.uid);
  });

  // TODO: add tests
});
