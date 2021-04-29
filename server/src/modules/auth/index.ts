export type UserId = string & { readonly type: unique symbol };
export const asUserId = (value: string) => value as UserId;

export type IdToken = string & { readonly type: unique symbol };
export const asIdToken = (value: string) => value as IdToken;

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
