import { AuthProvider, DecodedIdToken } from "./index";
import { auth } from "../firebase";
import { inject, injectable } from "inversify";
import { Session } from "./Session";
import { UserService } from "../users";
import { buildSessionCookie } from "../cookies";

@injectable()
export class FirebaseAuthProvider implements AuthProvider {
  @inject(UserService)
  private userService: UserService;

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

  async createSessionCookie(
    idToken: string
  ): Promise<{ content: string; expiresIn: number }> {
    // Set session expiration to 7 days.
    const expiresIn = 60 * 60 * 24 * 7 * 1000;

    // TODO: verify if idToken auth_time is from last N minutes?
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    });

    return { content: sessionCookie, expiresIn };
  }

  async getSession(sessionCookie: string | null): Promise<Session | null> {
    if (!sessionCookie) return null;

    const decodedIdToken = await this.verifySessionCookie(sessionCookie, false);
    const userProfile = await this.userService.getProfile(decodedIdToken.uid);

    return {
      uid: decodedIdToken.uid,
      email: decodedIdToken.email,
      emailVerified: decodedIdToken.emailVerified,
      profile: userProfile,
    };
  }
}
