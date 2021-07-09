import { injectable } from "inversify";
import {
  asEmail,
  asUserId,
  asIdToken,
  User,
  UserId,
  IdToken,
  AuthProvider,
  DecodedIdToken,
  UserCookieContent,
} from "@/modules/auth";

export const revokedIdToken = asIdToken("mock-revoked-id-token");
export const emailNotVerifiedIdToken = asIdToken(
  "mock-email-not-verified-id-token"
);

export const disabledUserId = asUserId("disabled-user-id");
export const emailNotVerifiedUserId = asUserId("email-not-verified-user-id");

const mockDecodedIdToken = (idToken: IdToken): DecodedIdToken => {
  return {
    uid: asUserId(idToken),
    email: asEmail("example@domain.com"),
    emailVerified: true,
  };
};
const mockUser = (uid: UserId): User => {
  return {
    uid: uid,
    email: asEmail("example@domain.com"),
    disabled: false,
    emailVerified: true,
  };
};

const mockDisabledUser: User = {
  uid: disabledUserId,
  email: asEmail("example@domain.com"),
  disabled: true,
  emailVerified: true,
};

const mockDecodedEmailNotVerifiedIdToken: DecodedIdToken = {
  uid: asUserId(emailNotVerifiedIdToken),
  email: asEmail("example@domain.com"),
  emailVerified: false,
};
const mockEmailNotVerifiedUser: User = {
  uid: emailNotVerifiedUserId,
  email: asEmail("example@domain.com"),
  disabled: false,
  emailVerified: false,
};

@injectable()
export class AuthProviderMock implements AuthProvider {
  async getUser(uid: UserId): Promise<User> {
    if (uid == disabledUserId) return mockDisabledUser;

    if (uid == emailNotVerifiedUserId) return mockEmailNotVerifiedUser;

    return mockUser(uid);
  }

  generateEmailVerificationLink(
    email: string,
    redirectUrl?: string
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async verifyIdToken(
    idToken: IdToken,
    checkIfRevoked: boolean
  ): Promise<DecodedIdToken> {
    if (idToken == revokedIdToken && checkIfRevoked) throw "IdToken revoked";

    if (idToken == emailNotVerifiedIdToken)
      return mockDecodedEmailNotVerifiedIdToken;

    return mockDecodedIdToken(idToken);
  }

  async getUserCookieContent(
    idToken: IdToken | null
  ): Promise<UserCookieContent | null> {
    if (!idToken) return null;
    return {
      uid: asUserId(idToken),
    };
  }
}
