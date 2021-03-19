import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

export const auth = firebase.auth();
