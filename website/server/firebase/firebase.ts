import * as admin from 'firebase-admin'

if (!admin.app) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })
}

export const app = admin.app
export const firestore = admin.firestore()
