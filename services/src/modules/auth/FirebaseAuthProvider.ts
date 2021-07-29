import {
  asEmail,
  asUserId,
  AuthProvider,
  DecodedIdToken,
  IdToken,
  User,
  UserCookieContent,
  UserId,
} from "./index";
import { auth } from "@/connectors/firebase";
import { injectable } from "inversify";

@injectable()
export class FirebaseAuthProvider implements AuthProvider {
  async getUser(uid: UserId): Promise<User> {
    const user = await auth().getUser(uid);
    return {
      uid: uid,
      email: user.email,
      emailVerified: !!user.emailVerified,
      disabled: user.disabled,
    };
  }

  async verifyIdToken(
    idToken: IdToken,
    checkIfRevoked: boolean
  ): Promise<DecodedIdToken> {
    const token = await auth().verifyIdToken(idToken, checkIfRevoked);

    return {
      uid: asUserId(token.uid),
      email: token.email ? asEmail(token.email) : null,
      emailVerified: !!token.email_verified,
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

  async generateEmailVerificationLink(
    email: string,
    redirectUrl?: string
  ): Promise<string> {
    const options = redirectUrl
      ? {
          url: redirectUrl,
        }
      : undefined;
    return await auth().generateEmailVerificationLink(email, options);
  }
}
