import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

export const initFirebaseApp = (options: Object) => {
  if (!firebase.apps.length) {
    try {
      firebase.initializeApp(options);
    } catch (e) {
      // TODO: handle error
      console.error(e);
    }
  }
};

export default firebase;
export const auth = () => firebase.auth();
export const analytics = () => firebase.analytics();

export type User = firebase.User;
