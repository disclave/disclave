import { AuthProvider, DecodedIdToken, UserId } from "./index";
import { auth } from "@/connectors/firebase";
import { inject, injectable } from "inversify";
import { Session } from "./Session";
import { UserService } from "@/modules/users";
import { EmailService } from "@/modules/email";

@injectable()
export class FirebaseAuthProvider implements AuthProvider {
  @inject(UserService)
  private userService: UserService;

  @inject(EmailService)
  private emailService: EmailService;

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

  async sendVerificationEmail(
    uid: UserId,
    redirectUrl: string | null
  ): Promise<boolean> {
    const user = await auth().getUser(uid);
    if (user.emailVerified || !user.email) return false;

    const settings = redirectUrl
      ? {
          url: redirectUrl,
        }
      : undefined;

    const verificationLink = await auth().generateEmailVerificationLink(
      user.email,
      settings
    );
    await this.emailService.sendVerificationEmail(user.email, verificationLink);
    return true;
  }
}
