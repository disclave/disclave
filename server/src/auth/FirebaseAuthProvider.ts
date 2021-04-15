import { AuthProvider, DecodedIdToken, UserCookieContent } from "./index";
import { auth } from "../firebase";
import { injectable } from "inversify";
import cookie from "cookie";

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

  async createSessionCookie(idToken: string): Promise<string> {
    // Set session expiration to 7 days.
    const expiresIn = 60 * 60 * 24 * 7 * 1000;

    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    });
    const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    return cookie.serialize("session", sessionCookie, options);
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
