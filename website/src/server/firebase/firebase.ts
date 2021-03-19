import * as admin from 'firebase-admin';

const cert = process.env.FIREBASE_CERT;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(cert))
  });
}

export { admin };
export const firestore = admin.firestore();
export const auth = admin.auth();
