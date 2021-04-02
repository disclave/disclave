import { auth } from "../../firebase";
import { UserProfileEntity } from "./UserProfileEntity";
import { UserRepository } from "./index";
import { injectable } from "inversify";
import { ClientSession, db, withTransaction, Timestamp } from "../../mongodb";

interface DbProfile {
  _id: string;
  name: string;
  normalizedName: string;
  createdTs: Timestamp;
}

@injectable()
export class UserMongoRepository implements UserRepository<ClientSession> {
  public async runTransaction(
    run: (session: ClientSession) => Promise<unknown>
  ): Promise<void> {
    await withTransaction(run);
  }

  // TODO: move to auth module?
  public async getUser(uid: string) {
    return auth().getUser(uid);
  }

  public async existProfileByName(
    name: string,
    session?: ClientSession
  ): Promise<boolean> {
    const collection = await profilesDbCollection();
    const normalized = name.toLowerCase();
    const result = await collection.countDocuments(
      { normalizedName: normalized },
      { session }
    );
    return result > 0;
  }

  public async createProfile(
    userId: string,
    profile: { name: string },
    session?: ClientSession
  ) {
    const collection = await profilesDbCollection();
    await collection.insertOne(toDbProfile(userId, profile.name), {
      session,
    });
  }

  public async getUserProfile(
    uid: string,
    session?: ClientSession
  ): Promise<UserProfileEntity | null> {
    const collection = await profilesDbCollection();
    const doc = await collection.findOne({ _id: uid }, { session });

    if (!doc) return null;
    return cursorDocToEntity(doc);
  }
}

const toDbProfile = (uid: string, name: string): DbProfile => ({
  _id: uid,
  name: name,
  normalizedName: name.toLowerCase(),
  createdTs: new Timestamp(0, Math.floor(new Date().getTime() / 1000)),
});

const cursorDocToEntity = (doc: DbProfile): UserProfileEntity => ({
  id: doc._id,
  name: doc.name,
});

const profilesCollection = "profiles";

const profilesDbCollection = async () => {
  return (await db()).collection<DbProfile>(profilesCollection);
};
