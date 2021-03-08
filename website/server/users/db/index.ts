import {UserRecord} from "../../firebase";
import {UserProfileEntity} from "./UserProfileEntity";
import {UserRepository} from "./UserRepository";
import {Port} from "../../../helpers/Port";

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

export const userRepository = new Port<IUserRepository>(UserRepository)
