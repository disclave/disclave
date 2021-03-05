import {auth, firestore} from "../../firebase/firebase"

interface FirestoreProfile {
  name: string
}

export class UserRepository {
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
}

const profilesCollection = 'profiles'

const profilesCollectionRef = () => {
  return firestore.collection(profilesCollection)
}