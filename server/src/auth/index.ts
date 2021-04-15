export type UserId = string;

export interface DecodedIdToken {
  uid: UserId;
  email: string;
  emailVerified: boolean;
}

export interface UserCookieContent {
  uid: UserId;
}

export abstract class AuthProvider {
  abstract verifySessionCookie(
    sessionCookie: string,
    checkIfRevoked: boolean
  ): Promise<DecodedIdToken>;

  abstract createSessionCookie(idToken: string): Promise<string>;
}
