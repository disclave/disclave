import { injectable } from "inversify";
import {
  asEmail,
  asUserId,
  asIdToken,
  IdToken,
  AuthProvider,
  DecodedIdToken,
  UserCookieContent,
} from "@/modules/auth";

export const revokedIdToken = asIdToken("mock-revoked-id-token");
export const emailNotVerifiedIdToken = asIdToken(
  "mock-email-not-verified-id-token"
);

const mockDecodedIdToken = (idToken: IdToken): DecodedIdToken => {
  return {
    uid: asUserId(idToken),
    email: asEmail("example@domain.com"),
    emailVerified: true,
  };
};

const mockDecodedEmailNotVerifiedIdToken: DecodedIdToken = {
  uid: asUserId(emailNotVerifiedIdToken),
  email: asEmail("example@domain.com"),
  emailVerified: false,
};

@injectable()
export class AuthProviderMock implements AuthProvider {
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
    return {
      uid: asUserId(idToken),
    };
  }
}
