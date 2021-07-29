import { ProfileEntity } from "./ProfileEntity";
import { ProfileRepository } from "./index";
import { injectable } from "inversify";
import {
  ClientSession,
  db,
  Timestamp,
  MongoRepository,
  timestampNow,
} from "@/connectors/mongodb";
import { asUserId, UserId } from "@/modules/auth";

interface DbProfile {
  _id: string;
  name: string;
  normalizedName: string;
  createdTs: Timestamp;
}

@injectable()
export class ProfileMongoRepository
  extends MongoRepository
  implements ProfileRepository<ClientSession> {
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

  public async getProfile(
    uid: UserId,
    session?: ClientSession
  ): Promise<ProfileEntity | null> {
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
  createdTs: timestampNow(),
});

const cursorDocToEntity = (doc: DbProfile): ProfileEntity => ({
  uid: asUserId(doc._id),
  name: doc.name,
});

const profilesCollection = "profiles";

const profilesDbCollection = async () => {
  return (await db()).collection<DbProfile>(profilesCollection);
};
