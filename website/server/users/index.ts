import {UserProfile} from "./UserProfile";

export type {
  UserProfile
}

export interface IUserService {
  verifyIdToken(idToken: string, checkIfRevoked: boolean): Promise<string>

  createProfile(idToken: string, name: string): Promise<string>

  getProfile(idToken: string): Promise<UserProfile>
}
