import {
  auth,
  User,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "../firebase";

export const login = async (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password);
export const logout = async () => auth().signOut();

export const register = async (email: string, password: string) =>
  auth().createUserWithEmailAndPassword(email, password);

// TODO: set URL parameter for email
export const sendEmailVerification = () => currentUser().sendEmailVerification()

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await auth().signInWithPopup(provider);
};
export const loginWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  return await auth().signInWithPopup(provider);
};

export const onAuthStateChanged = (callback: (user: User | null) => void) =>
  auth().onAuthStateChanged(callback);
export const currentUser = () => auth().currentUser;

export type { UserModel } from "./UserModel";
export type { UserProfileModel } from "./UserProfileModel";

export { useSession } from "./hooks";
