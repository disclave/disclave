import { ProfileService } from "@/modules/profiles";
import { Container } from "inversify";
import { asUserId, AuthProvider } from "@/modules/auth";
import { AuthProviderMock } from "../../mocks/AuthProviderMock";
import { ProfileRepository } from "@/modules/profiles/db";
import { ProfileRepositoryMock } from "../../mocks/ProfileRepositoryMock";
import { ProfileServiceImpl } from "@/modules/profiles/ProfileServiceImpl";

describe("Testing UserService", () => {
  const container = new Container();

  container.bind(AuthProvider).to(AuthProviderMock);
  container.bind(ProfileRepository).to(ProfileRepositoryMock);

  container.bind<ProfileService>(ProfileServiceImpl).toSelf();
  const service = container.get<ProfileService>(ProfileServiceImpl);

  afterEach(() => {
    ProfileRepositoryMock.deleteAll();
  });

  test("should create new user profile", async () => {
    const userId = asUserId("user-id");
    const name = "User_Name";

    const insertResult = await service.createProfile(userId, name);
    const findResult = await service.getProfile(userId);

    expect(insertResult.name).toEqual(name);
    expect(findResult.name).toEqual(name);
  });

  test("should not create user profile if already exists", async () => {
    const userId = asUserId("user-id");
    const name = "User_Name";

    await service.createProfile(userId, name);

    await expect(async () => {
      await service.createProfile(userId, name);
    }).rejects.toThrow();
  });

  test("should not create user profile with duplicated names", async () => {
    const userId1 = asUserId("user-id-1");
    const userId2 = asUserId("user-id-2");

    const name1 = "User_Name";
    const name2 = "useR_naMe";

    await service.createProfile(userId1, name1);

    await expect(async () => {
      await service.createProfile(userId2, name2);
    }).rejects.toThrow();
  });

  test("should not create user profile with white space", async () => {
    const userId = asUserId("user-id");
    const wsNames = [" User_Name", "User Name", "User_Name "];

    for (let name in wsNames) {
      await expect(async () => {
        await service.createProfile(userId, name);
      }).rejects.toThrow();
    }
  });

  test("should not create user profile with special characters", async () => {
    const userId = asUserId("user-id");
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
        await service.createProfile(userId, "N" + c);
      }).rejects.toThrow();
    }
  });

  test("should not create user profile with forbidden word in name", async () => {
    const userId = asUserId("user-id");
    const forbiddenNames = [
      "userAdmiName",
      "ThisIsDisclave",
      "Admin",
      "Disclave",
      "MoDeRator",
    ];

    for (let name in forbiddenNames) {
      await expect(async () => {
        await service.createProfile(userId, name);
      }).rejects.toThrow();
    }
  });
});
