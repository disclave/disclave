import { auth } from '../firebase/firebase';

export const login = async (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);
export const logout = async () => auth.signOut();

export const onAuthStateChanged = (callback) => auth.onAuthStateChanged(callback);
export const currentUser = () => auth.currentUser;
