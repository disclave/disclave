import { injectable } from 'inversify';
import { AuthProvider, DecodedIdToken } from '../../src/server/auth';

@injectable()
export class AuthProviderMock implements AuthProvider {
  public static tokenMock: DecodedIdToken = {
    uid: 'mock-user-id'
  };

  async verifyIdToken(idToken: string, checkIfRevoked: boolean): Promise<DecodedIdToken> {
    return AuthProviderMock.tokenMock;
  }
}
