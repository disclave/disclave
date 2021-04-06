import { injectable } from "inversify";
import { AuthProvider, DecodedIdToken } from "../../src/auth";

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
}
