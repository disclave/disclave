import firebase from "firebase/app";
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
export const analytics = () => firebase.analytics();
