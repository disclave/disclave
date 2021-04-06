import { AuthProvider, DecodedIdToken, UserCookieContent } from "./index";
import { auth } from "../firebase";
import { injectable } from "inversify";

@injectable()
export class FirebaseAuthProvider implements AuthProvider {
  async verifyIdToken(
    idToken: string,
    checkIfRevoked: boolean
  ): Promise<DecodedIdToken> {
    const token = await auth().verifyIdToken(idToken, checkIfRevoked);

    return {
      uid: token.uid,
    };
  }

  async getUserCookieContent(
    idToken: string | null
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
