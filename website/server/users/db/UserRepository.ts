import {auth, firestore} from "../../firebase/firebase"

interface FirestoreProfile {
  name: string
}

export class UserRepository {
  public async getUser(uid: string) {
    return auth.getUser(uid)
  }

  public async createProfile(userId: string, profile: FirestoreProfile) {
    const ref = profilesCollectionRef().doc(userId)
    await firestore.runTransaction(async t => {
      const checkProfile = await t.get(ref)
      if (checkProfile.exists)
        throw 'User profile already exists'

      await t.set(ref, profile)
    })
  }
}

const profilesCollection = 'profiles'

const profilesCollectionRef = () => {
  return firestore.collection(profilesCollection)
}