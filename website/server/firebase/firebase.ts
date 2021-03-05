import * as admin from 'firebase-admin'

const cert = process.env.FIREBASE_CERT

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(cert))
  })
}

export { admin }
export const app = admin.app
export const firestore = admin.firestore()
export const auth = admin.auth()

export type FirestoreDataConverter<T> = admin.firestore.FirestoreDataConverter<T>
export type CollectionReference<T> = admin.firestore.CollectionReference<T>
export type DocumentData<T> = admin.firestore.DocumentData<T>
export type QueryDocumentSnapshot<T> = admin.firestore.QueryDocumentSnapshot<T>
