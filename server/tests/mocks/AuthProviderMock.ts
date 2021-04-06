import { injectable } from "inversify";
import {
  AuthProvider,
  DecodedIdToken,
  UserCookieContent,
} from "../../src/auth";

@injectable()
export class AuthProviderMock implements AuthProvider {
  async verifyIdToken(
    idToken: string,
    checkIfRevoked: boolean
  ): Promise<DecodedIdToken> {
    return {
      uid: idToken,
    };
  }

  async getUserCookieContent(
    idToken: string | null
  ): Promise<UserCookieContent | null> {
    return {
      uid: idToken,
    };
  }
}
