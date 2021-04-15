import {
  auth,
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
  UserCredential,
} from "../../firebase";
import { login } from "./client";

export const loginEmailPass = async (email: string, password: string) => {
  const userCredential = await auth().signInWithEmailAndPassword(
    email,
    password
  );
  await authorizeWithServer(userCredential);
};

export const loginWithGoogle = async (emailRedirectUrl?: string) => {
  await signInWithPopup(new GoogleAuthProvider(), emailRedirectUrl);
};
export const loginWithFacebook = async (emailRedirectUrl?: string) => {
  await signInWithPopup(new FacebookAuthProvider(), emailRedirectUrl);
};

export const registerEmailPass = async (
  email: string,
  password: string,
  emailRedirectUrl?: string
) => {
  const userCredential = await auth().createUserWithEmailAndPassword(
    email,
    password
  );
  await sendVerificationEmail(userCredential.user, emailRedirectUrl);
  // TODO: authorize with server in here or after email confirmation?
  // TODO: and what if email already verified?
};

// TODO: verify this
// export const applyActionCode = (code: string) => auth().applyActionCode(code);

// TODO: how to handle it without local state? server side?
// export const sendEmailVerification = (emailRedirectUrl?: string) =>
//   sendVerificationEmail(currentUser(), emailRedirectUrl);

const signInWithPopup = async (
  provider: AuthProvider,
  emailRedirectUrl?: string
) => {
  const userCredential = await auth().signInWithPopup(provider);
  await sendVerificationEmail(userCredential.user, emailRedirectUrl);
  // TODO: authorize with server in here or after email confirmation?
  // TODO: and what if email already verified?
};

const authorizeWithServer = async (userCredential: UserCredential) => {
  const idToken = await userCredential.user.getIdToken();

  // TODO: use csrfToken with this request
  // TODO: should return user profile - fetch it and return from this function
  await login(idToken);

  // clear firebase storage - from now use the cookie
  await auth().signOut();
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
