import { AuthProvider, DecodedIdToken } from "./index";
import { auth } from "../firebase";
import { injectable } from "inversify";
import cookie from "cookie";

@injectable()
export class FirebaseAuthProvider implements AuthProvider {
  async verifySessionCookie(
    sessionCookie: string,
    checkIfRevoked: boolean
  ): Promise<DecodedIdToken> {
    const decodedIdToken = await auth().verifySessionCookie(
      sessionCookie,
      checkIfRevoked
    );

    return {
      uid: decodedIdToken.uid,
      email: decodedIdToken.email,
      emailVerified: decodedIdToken.email_verified,
    };
  }

  async createSessionCookie(idToken: string): Promise<string> {
    // Set session expiration to 7 days.
    const expiresIn = 60 * 60 * 24 * 7 * 1000;

    // TODO: verify if idToken auth_time is from last N minutes?
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    });
    // TODO: maybe move to cookies/index.ts file?
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "none" as boolean | "none" | "lax" | "strict",
    };
    // TODO: rename cookie?
    return cookie.serialize("session", sessionCookie, options);
  }

  // async getUserCookieContent(
  //   idToken: string | null
  // ): Promise<UserCookieContent | null> {
  //   if (!idToken) return null;
  //
  //   try {
  //     const data = await this.verifyIdToken(idToken, false);
  //     return {
  //       uid: data.uid,
  //     };
  //   } catch {
  //     return null;
  //   }
  // }
}
