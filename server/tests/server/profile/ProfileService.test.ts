import { ProfileService } from "@/modules/profiles";
import { Container } from "inversify";
import { asUserId, asIdToken, AuthProvider } from "@/modules/auth";
import {
  AuthProviderMock,
  emailNotVerifiedIdToken,
  revokedIdToken,
} from "../../mocks/AuthProviderMock";
import { ProfileRepository } from "@/modules/profiles/db";
import { ProfileRepositoryMock } from "../../mocks/ProfileRepositoryMock";
import { ProfileServiceImpl } from "@/modules/profiles/ProfileServiceImpl";

describe("Testing ProfileService", () => {
  const container = new Container();

  container.bind(AuthProvider).to(AuthProviderMock);
  container.bind(ProfileRepository).to(ProfileRepositoryMock);

  container.bind<ProfileService>(ProfileServiceImpl).toSelf();
  const service = container.get<ProfileService>(ProfileServiceImpl);

  afterEach(() => {
    ProfileRepositoryMock.deleteAll();
  });

  test("should create new user profile", async () => {
    const idToken = asIdToken("user-id");
    const userId = asUserId("user-id");
    const name = "User_Name";

    const insertResult = await service.createProfile(idToken, name);
    const findResult = await service.getProfile(userId);

    expect(insertResult.name).toEqual(name);
    expect(findResult.name).toEqual(name);
  });

  test("should not create user profile if already exists", async () => {
    const idToken = asIdToken("user-id");
    const name = "User_Name";

    await service.createProfile(idToken, name);

    await expect(async () => {
      await service.createProfile(idToken, name);
    }).rejects.toThrow();
  });

  test("should not create user profile if id token revoked", async () => {
    const idToken = revokedIdToken;
    const name = "User_Name";

    expect(async () => {
      await service.createProfile(idToken, name);
    }).rejects.toBeTruthy();
  });

  test("should not create user profile if email not verified", async () => {
    const idToken = emailNotVerifiedIdToken;
    const name = "User_Name";

    await expect(async () => {
      await service.createProfile(idToken, name);
    }).rejects.toThrow();
  });

  test("should not create user profile with duplicated names", async () => {
    const idToken1 = asIdToken("user-id-1");
    const idToken2 = asIdToken("user-id-2");

    const name1 = "User_Name";
    const name2 = "useR_naMe";

    await service.createProfile(idToken1, name1);

    await expect(async () => {
      await service.createProfile(idToken2, name2);
    }).rejects.toThrow();
  });

  test("should not create user profile with white space", async () => {
    const idToken = asIdToken("user-id");
    const wsNames = [" User_Name", "User Name", "User_Name "];

    for (let name in wsNames) {
      await expect(async () => {
        await service.createProfile(idToken, name);
      }).rejects.toThrow();
    }
  });

  test("should not create user profile with special characters", async () => {
    const idToken = asIdToken("user-id");
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
    const idToken = asIdToken("user-id");
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
