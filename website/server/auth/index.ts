export interface DecodedIdToken {
  uid: string;
}

export abstract class AuthProvider {
  abstract verifyIdToken(idToken: string, checkIfRevoked: boolean): Promise<DecodedIdToken>;
}
