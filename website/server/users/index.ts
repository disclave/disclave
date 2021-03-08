import {UserProfile} from "./UserProfile";
import {UserService} from "./UserService";
import {Port} from "../../helpers/Port";

export type {
  UserProfile
}

export interface IUserService {
  verifyIdToken(idToken: string, checkIfRevoked: boolean): Promise<string>

  createProfile(idToken: string, name: string): Promise<string>

  getProfile(idToken: string): Promise<UserProfile>
}

export const userServicePort = new Port<IUserService>(UserService)
