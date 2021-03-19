import * as admin from "firebase-admin";

export const initFirebase = (serviceAccountObject: Object) => {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountObject),
      });
    } catch (e) {
      // TODO: handle errors
      console.error(e);
    }
  }
};

export { admin };
export const firestore = () => admin.firestore();
export const auth = () => admin.auth();
