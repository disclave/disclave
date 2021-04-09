import {
  auth,
  User,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "../firebase";
import firebase from "firebase";
import AuthProvider = firebase.auth.AuthProvider;
import UserCredential = firebase.auth.UserCredential;

export const login = async (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password);
export const logout = async () => auth().signOut();

export const register = async (
  email: string,
  password: string,
  emailRedirectUrl?: string
) => {
  const userCredential = await auth().createUserWithEmailAndPassword(
    email,
    password
  );
  await sendVerificationEmail(userCredential.user, emailRedirectUrl);
  return userCredential;
};

export const loginWithGoogle = async (emailRedirectUrl?: string) =>
  signInWithPopup(new GoogleAuthProvider(), emailRedirectUrl);
export const loginWithFacebook = async (emailRedirectUrl?: string) =>
  signInWithPopup(new FacebookAuthProvider(), emailRedirectUrl);

export const sendEmailVerification = (emailRedirectUrl?: string) =>
  sendVerificationEmail(currentUser(), emailRedirectUrl);

export const applyActionCode = (code: string) => auth().applyActionCode(code);

export const onAuthStateChanged = (callback: (user: User | null) => void) =>
  auth().onAuthStateChanged(callback);
export const currentUser = () => auth().currentUser;

export type { UserModel } from "./UserModel";
export type { UserProfileModel } from "./UserProfileModel";

export { useSession } from "./hooks";

const signInWithPopup = async (
  provider: AuthProvider,
  emailRedirectUrl?: string
): Promise<UserCredential> => {
  const userCredential = await auth().signInWithPopup(provider);
  await sendVerificationEmail(userCredential.user, emailRedirectUrl);
  return userCredential;
};

const sendVerificationEmail = async (user: User, emailRedirectUrl?: string) => {
  if (user.emailVerified) return;

  await user.sendEmailVerification({
    url: emailRedirectUrl,
  });
};
