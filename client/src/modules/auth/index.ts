import {
  auth,
  AuthProvider,
  User,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "../../firebase";
import { setAuthToken } from "../../graphql";
import { sendVerificationEmail } from "./client";

export type { ProfileModel, UserModel, UserId, SessionMessage } from "./models";
export { asUserId } from "./models";
export { SessionProvider, useSession } from "./context";

export const login = async (email: string, password: string) => {
  await auth().signInWithEmailAndPassword(email, password);
};

export const logout = async () => {
  await auth().signOut();
};

export const register = async (
  email: string,
  password: string,
  emailRedirectUrl?: string
) => {
  const userCredential = await auth().createUserWithEmailAndPassword(
    email,
    password
  );

  if (!userCredential.user) throw new Error("Missing user object");
  await checkAndSendEmailVerification(userCredential.user, emailRedirectUrl);
};

export const loginWithGoogle = async (emailRedirectUrl?: string) => {
  await signInWithPopup(new GoogleAuthProvider(), emailRedirectUrl);
};
export const loginWithFacebook = async (emailRedirectUrl?: string) => {
  await signInWithPopup(new FacebookAuthProvider(), emailRedirectUrl);
};

export const applyActionCode = async (code: string) => {
  await auth().applyActionCode(code);
};

const signInWithPopup = async (
  provider: AuthProvider,
  emailRedirectUrl?: string
) => {
  const userCredential = await auth().signInWithPopup(provider);

  if (!userCredential.user) throw new Error("Missing user object");
  await checkAndSendEmailVerification(userCredential.user, emailRedirectUrl);
};

const checkAndSendEmailVerification = async (
  user: User,
  emailRedirectUrl?: string
) => {
  if (user.emailVerified) return;
  const idToken = await user.getIdToken();
  setAuthToken(idToken);
  await sendVerificationEmail(emailRedirectUrl);
};
