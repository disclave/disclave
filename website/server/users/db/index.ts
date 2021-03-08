import {UserRecord} from "../../firebase";
import {UserProfileEntity} from "./UserProfileEntity";

export type {
  UserRecord,
  UserProfileEntity
}

export interface CreateProfileData {
  name: string
}

export interface IUserRepository {
  getUser(uid: string): Promise<UserRecord>

  createProfile(userId: string, profile: CreateProfileData): Promise<string>

  getUserProfile(uid: string): Promise<UserProfileEntity>
}
