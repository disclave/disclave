import { admin } from './firebase';

export { admin };
export { firestore, auth } from './firebase';

export type FirestoreDataConverter<T> = admin.firestore.FirestoreDataConverter<T>;
export type QueryDocumentSnapshot<T> = admin.firestore.QueryDocumentSnapshot<T>;

export type UserRecord = admin.auth.UserRecord;
