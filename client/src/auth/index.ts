import { auth, User } from "../firebase";

export const login = async (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password);
export const logout = async () => auth().signOut();

export const register = async (email: string, password: string) =>
  auth().createUserWithEmailAndPassword(email, password);

export const onAuthStateChanged = (callback: (user: User | null) => void) =>
  auth().onAuthStateChanged(callback);
export const currentUser = () => auth().currentUser;

export type { UserModel } from "./UserModel";
export type { UserProfileModel } from "./UserProfileModel";

export { useSession } from "./hooks";
