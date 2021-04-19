import {
  auth,
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
  UserCredential,
} from "../../firebase";
import { login, sendVerificationEmail } from "./client";
import { SessionModel } from "./models";

export const loginEmailPass = async (
  email: string,
  password: string
): Promise<SessionModel> => {
  const userCredential = await auth().signInWithEmailAndPassword(
    email,
    password
  );
  return await authorizeWithServer(userCredential);
};

export const loginWithGoogle = async (
  emailRedirectUrl?: string
): Promise<SessionModel> => {
  return await signInWithPopup(new GoogleAuthProvider(), emailRedirectUrl);
};
export const loginWithFacebook = async (
  emailRedirectUrl?: string
): Promise<SessionModel> => {
  return await signInWithPopup(new FacebookAuthProvider(), emailRedirectUrl);
};

export const registerEmailPass = async (
  email: string,
  password: string,
  emailRedirectUrl?: string
): Promise<SessionModel> => {
  const userCredential = await auth().createUserWithEmailAndPassword(
    email,
    password
  );
  if (!userCredential.user.emailVerified)
    await sendVerificationEmail(emailRedirectUrl);
  return await authorizeWithServer(userCredential);
};

// TODO: verify this
// export const applyActionCode = (code: string) => auth().applyActionCode(code);

const signInWithPopup = async (
  provider: AuthProvider,
  emailRedirectUrl?: string
): Promise<SessionModel> => {
  const userCredential = await auth().signInWithPopup(provider);
  if (!userCredential.user.emailVerified)
    await sendVerificationEmail(emailRedirectUrl);
  return await authorizeWithServer(userCredential);
};

const authorizeWithServer = async (
  userCredential: UserCredential
): Promise<SessionModel> => {
  const idToken = await userCredential.user.getIdToken();
  // TODO: use csrfToken with this request
  const session = await login(idToken);
  // clear firebase storage - from now use the cookie
  await auth().signOut();
  return session;
};
