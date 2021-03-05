import {UserRecord} from "../../firebase";
import {UserProfileEntity} from "./UserProfileEntity";
import {UserRepository} from "./UserRepository";

interface CreateProfileData {
  name: string
}

export interface IUserRepository {
  getUser(uid: string): Promise<UserRecord>
  createProfile(userId: string, profile: CreateProfileData): Promise<string>
  getUserProfile(uid: string): Promise<UserProfileEntity>
}

export const userRepositoryManager = new DependencyManager<IUserRepository>(new UserRepository())
