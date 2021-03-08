import {UserProfile} from "./UserProfile";
import {UserService} from "./UserService";
import {Port} from "../../helpers/Port";

export interface IUserService {
  verifyIdToken(idToken: string, checkIfRevoked: boolean): Promise<string>

  createProfile(idToken: string, name: string): Promise<string>

  getProfile(idToken: string): Promise<UserProfile>
}

export const userService = new Port<IUserService>(UserService)
