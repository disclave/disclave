import {
  auth,
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
  UserCredential,
} from "../../firebase";
import { login } from "./client";
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
  await sendVerificationEmail(userCredential.user, emailRedirectUrl);
  return await authorizeWithServer(userCredential);
};

// TODO: verify this
// export const applyActionCode = (code: string) => auth().applyActionCode(code);

// TODO: how to handle it without local state? server side?
// export const sendEmailVerification = (emailRedirectUrl?: string) =>
//   sendVerificationEmail(currentUser(), emailRedirectUrl);

const signInWithPopup = async (
  provider: AuthProvider,
  emailRedirectUrl?: string
): Promise<SessionModel> => {
  const userCredential = await auth().signInWithPopup(provider);
  await sendVerificationEmail(userCredential.user, emailRedirectUrl);
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

const sendVerificationEmail = async (user: User, emailRedirectUrl?: string) => {
  if (user.emailVerified) return;

  const settings = emailRedirectUrl
    ? {
        url: emailRedirectUrl,
      }
    : undefined;

  await user.sendEmailVerification(settings);
};
