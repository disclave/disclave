export interface DecodedIdToken {
  uid: string;
}

export interface UserCookieContent {
  uid: string;
}

export abstract class AuthProvider {
  abstract verifyIdToken(
    idToken: string,
    checkIfRevoked: boolean
  ): Promise<DecodedIdToken>;

  abstract getUserCookieContent(
    idToken: string | null
  ): Promise<UserCookieContent | null>;
}
