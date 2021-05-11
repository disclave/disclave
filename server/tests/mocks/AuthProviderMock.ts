import { injectable } from "inversify";
import {
  asEmail,
  asUserId,
  AuthProvider,
  DecodedIdToken,
  UserCookieContent,
} from "@/modules/auth";

@injectable()
export class AuthProviderMock implements AuthProvider {
  generateEmailVerificationLink(email: string, redirectUrl?: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  
  async verifyIdToken(
    idToken: string,
    checkIfRevoked: boolean
  ): Promise<DecodedIdToken> {
    return {
      uid: asUserId(idToken),
      email: asEmail("example@domain.com")
    };
  }

  async getUserCookieContent(
    idToken: string | null
  ): Promise<UserCookieContent | null> {
    return {
      uid: asUserId(idToken),
    };
  }
}
