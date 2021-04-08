export type UserId = string;
export type IdToken = string;

export interface DecodedIdToken {
  uid: UserId;
}

export interface UserCookieContent {
  uid: UserId;
}

export abstract class AuthProvider {
  abstract verifyIdToken(
    idToken: IdToken,
    checkIfRevoked: boolean
  ): Promise<DecodedIdToken>;

  abstract getUserCookieContent(
    idToken: IdToken | null
  ): Promise<UserCookieContent | null>;
}
