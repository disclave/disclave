import * as admin from 'firebase-admin'

const cert = process.env.FIREBASE_CERT

// if (!admin.app) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(cert))
  })
// }

export const app = admin.app
export const firestore = admin.firestore()
