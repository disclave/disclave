export type UserId = string & { readonly type: unique symbol };
export const asUserId = (value: string) => value as UserId;

export type IdToken = string & { readonly type: unique symbol };
export const asIdToken = (value: string) => value as IdToken;

export type Email = string & { readonly type: unique symbol };
export const asEmail = (value: string) => value as Email;

export interface DecodedIdToken {
  uid: UserId;
  email: Email | null;
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

  abstract generateEmailVerificationLink(
    email: string,
    redirectUrl?: string
  ): Promise<string>;
}
