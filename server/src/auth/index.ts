export type UserId = string;

export interface DecodedIdToken {
  uid: UserId;
}

export interface UserCookieContent {
  uid: UserId;
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
