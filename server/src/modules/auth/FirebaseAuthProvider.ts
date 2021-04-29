import {
  asUserId,
  AuthProvider,
  DecodedIdToken,
  IdToken,
  UserCookieContent,
} from "./index";
import { auth } from "@/connectors/firebase";
import { injectable } from "inversify";

@injectable()
export class FirebaseAuthProvider implements AuthProvider {
  async verifyIdToken(
    idToken: IdToken,
    checkIfRevoked: boolean
  ): Promise<DecodedIdToken> {
    const token = await auth().verifyIdToken(idToken, checkIfRevoked);

    return {
      uid: asUserId(token.uid),
    };
  }

  async getUserCookieContent(
    idToken: IdToken | null
  ): Promise<UserCookieContent | null> {
    if (!idToken) return null;

    try {
      const data = await this.verifyIdToken(idToken, false);
      return {
        uid: data.uid,
      };
    } catch {
      return null;
    }
  }
}
