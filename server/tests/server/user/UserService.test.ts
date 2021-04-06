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

  afterEach(() => {
    UserRepositoryMock.deleteAll();
  });

  test("should return user id from verifyIdToken method", async () => {
    const idToken = "id-token";

    const result = await service.verifyIdToken(idToken);

    expect(result).toEqual(idToken);
  });

  test("should create new user profile", async () => {
    const idToken = "random-user-id-token";
    const name = "User_Name";

    const insertResult = await service.createProfile(idToken, name);
    const findResult = await service.getProfile(idToken);

    expect(insertResult.name).toEqual(name);
    expect(findResult.name).toEqual(name);
  });

  test("should not create user profile if already exists", async () => {
    const idToken = "random-user-id-token";
    const name = "User_Name";

    await service.createProfile(idToken, name);

    await expect(async () => {
      await service.createProfile(idToken, name);
    }).rejects.toThrow();
  });

  test("should not create user profile with duplicated names", async () => {
    const idToken1 = "random-user-id-token-1";
    const idToken2 = "random-user-id-token-2";

    const name1 = "User_Name";
    const name2 = "useR_naMe";

    await service.createProfile(idToken1, name1);

    await expect(async () => {
      await service.createProfile(idToken2, name2);
    }).rejects.toThrow();
  });

  test("should not create user profile with white space", async () => {
    const idToken = "random-user-id-token";
    const wsNames = [" User_Name", "User Name", "User_Name "];

    for (let name in wsNames) {
      await expect(async () => {
        await service.createProfile(idToken, name);
      }).rejects.toThrow();
    }
  });

  test("should not create user profile with special characters", async () => {
    const idToken = "random-user-id-token";
    const sc = [
      "~",
      "`",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "+",
      "=",
      "[",
      "{",
      "]",
      "}",
      ":",
      ";",
      "'",
      '"',
      "\\",
      "|",
      ",",
      "<",
      ".",
      ">",
      "?",
      "/",
    ];

    for (let c in sc) {
      await expect(async () => {
        await service.createProfile(idToken, "N" + c);
      }).rejects.toThrow();
    }
  });

  test("should not create user profile with forbidden word in name", async () => {
    const idToken = "random-user-id-token";
    const forbiddenNames = [
      "userAdmiName",
      "ThisIsDisclave",
      "Admin",
      "Disclave",
      "MoDeRator",
    ];

    for (let name in forbiddenNames) {
      await expect(async () => {
        await service.createProfile(idToken, name);
      }).rejects.toThrow();
    }
  });
});
