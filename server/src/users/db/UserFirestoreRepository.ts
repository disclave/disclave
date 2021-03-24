import {
  auth,
  firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Transaction,
} from "../../firebase";
import { UserProfileEntity } from "./UserProfileEntity";
import { UserRepository } from "./index";
import { injectable } from "inversify";

const FirestoreFields = {
  name: "name",
} as const;

interface FirestoreProfile {
  [FirestoreFields.name]: string;
}

@injectable()
export class UserFirestoreRepository implements UserRepository<Transaction> {
  public async runTransaction(
    run: (t: Transaction) => Promise<unknown>
  ): Promise<void> {
    await firestore().runTransaction(run);
  }

  public async getUser(uid: string) {
    return auth().getUser(uid);
  }

  public async existProfileByName(
    name: string,
    t: Transaction
  ): Promise<boolean> {
    const ref = profilesCollectionRef();
    const result = await t.get(ref.where(FirestoreFields.name, "==", name));
    return !result.empty;
  }

  public async createProfile(
    userId: string,
    profile: FirestoreProfile,
    t: Transaction
  ) {
    const ref = profilesCollectionRef().doc(userId);
    await t.create(ref, profile);
  }

  public async getUserProfile(uid: string): Promise<UserProfileEntity | null> {
    const ref = profilesCollectionRef().doc(uid);
    const doc = await ref.get();
    if (!doc.exists) return null;
    return doc.data();
  }
}

const profileConverter: FirestoreDataConverter<UserProfileEntity> = {
  toFirestore(entity: UserProfileEntity): FirestoreProfile {
    return {
      name: entity.name,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<FirestoreProfile>
  ): UserProfileEntity {
    const data: FirestoreProfile = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
    };
  },
};

const profilesCollection = "profiles";

const profilesCollectionRef = () => {
  return firestore()
    .collection(profilesCollection)
    .withConverter(profileConverter);
};
