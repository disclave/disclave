import {
  auth
} from "../../firebase";
import { UserProfileEntity } from "./UserProfileEntity";
import { UserRepository } from "./index";
import { injectable } from "inversify";
import { ClientSession, db, withTransaction } from "../../mongodb";

const DbFields = {
  _id: "_id",
  name: "name",
  createdTs: "createdTs",
} as const;

interface DbProfile {
  [DbFields._id]: string;
  [DbFields.name]: string;
  [DbFields.createdTs]: string;
}

@injectable()
export class UserFirestoreRepository implements UserRepository<ClientSession> {
  public async runTransaction(
    run: (session: ClientSession) => Promise<unknown>
  ): Promise<void> {
    await withTransaction(run);
  }

  // TODO: move to auth module?
  public async getUser(uid: string) {
    return auth().getUser(uid);
  }

  public async existProfileByName(name: string, session?: ClientSession): Promise<boolean> {
    const result = await profilesDbCollection()
      .count({ [DbFields.name]: name }, { session });
    
    return result > 0;
  }

  public async createProfile(userId: string, profile: { name: string }, session?: ClientSession) {
    await profilesDbCollection().insertOne(toDbProfile(userId, profile.name), { session });
  }

  public async getUserProfile(uid: string, session?: ClientSession): Promise<UserProfileEntity | null> {
    const doc = await profilesDbCollection()
      .findOne({ [DbFields._id]: uid }, { session });

    if (!doc) return null;
    return cursorDocToEntity(doc);
  }
}

const toDbProfile = (uid: string, name: string): DbProfile => ({
  _id: uid,
  name: name,
  createdTs: new Date().toUTCString(), // TODO: test this and maybe change type
})

const cursorDocToEntity = (doc: DbProfile): UserProfileEntity => ({
  id: doc._id,
  name: doc.name,
});

const profilesCollection = "profiles";

const profilesDbCollection = () => {
  return db().collection(profilesCollection);
};
