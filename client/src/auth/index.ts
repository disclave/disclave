import { auth } from "../firebase";

export const login = async (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password);
export const logout = async () => auth().signOut();

export const onAuthStateChanged = (callback) =>
  auth().onAuthStateChanged(callback);
export const currentUser = () => auth().currentUser;

export { UserContext } from "./UserContext";
export type { UserProfileModel } from "./UserProfileModel";
export { useUserProfile } from "./useUserProfile";
