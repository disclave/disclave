import {auth, firestore, FirestoreDataConverter, QueryDocumentSnapshot} from "../../firebase/firebase"
import {UserProfileEntity} from "./UserProfileEntity";
import {IUserRepository} from "./index";

interface FirestoreProfile {
  name: string
}

export class UserRepository implements IUserRepository{
  public async getUser(uid: string) {
    return auth.getUser(uid)
  }

  public async createProfile(userId: string, profile: FirestoreProfile): Promise<string> {
    const ref = profilesCollectionRef().doc(userId)
    await firestore.runTransaction(async t => {
      // TODO: check for user with the same name

      const checkProfile = await t.get(ref)
      if (checkProfile.exists)
        throw 'User profile already exists'

      await t.set(ref, profile)
    })
    return userId
  }

  public async getUserProfile(uid: string): Promise<UserProfileEntity> {
    const doc = await profilesCollectionRef().doc(uid).get()
    return doc.data()
  }
}

const profileConverter: FirestoreDataConverter<UserProfileEntity> = {
  toFirestore(entity: UserProfileEntity): FirestoreProfile {
    return {
      name: entity.name
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<FirestoreProfile>): UserProfileEntity {
    const data: FirestoreProfile = snapshot.data()
    return {
      id: snapshot.id,
      name: data.name
    }
  }
}

const profilesCollection = 'profiles'

const profilesCollectionRef = () => {
  return firestore
    .collection(profilesCollection)
    .withConverter(profileConverter)
}