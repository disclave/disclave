import { auth } from "../../firebase";
import { UserProfileEntity } from "./UserProfileEntity";
import { UserRepository } from "./index";
import { injectable } from "inversify";
import { ClientSession, db, Timestamp, MongoRepository } from "../../mongodb";
import { UserId } from "../../auth";

interface DbProfile {
  _id: UserId;
  name: string;
  normalizedName: string;
  createdTs: Timestamp;
}

@injectable()
export class UserMongoRepository
  extends MongoRepository
  implements UserRepository<ClientSession> {
  // TODO: move to auth module?
  public async getUser(uid: UserId) {
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
    userId: UserId,
    profile: { name: string },
    session?: ClientSession
  ) {
    const collection = await profilesDbCollection();
    await collection.insertOne(toDbProfile(userId, profile.name), {
      session,
    });
  }

  public async getUserProfile(
    uid: UserId,
    session?: ClientSession
  ): Promise<UserProfileEntity | null> {
    const collection = await profilesDbCollection();
    const doc = await collection.findOne({ _id: uid }, { session });

    if (!doc) return null;
    return cursorDocToEntity(doc);
  }
}

const toDbProfile = (uid: UserId, name: string): DbProfile => ({
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
