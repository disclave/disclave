import {UserProfile} from "./UserProfile";
import {UserService} from "./UserService";
import {DependencyManager} from "../../helpers/DependencyManager";

export interface IUserService {
  verifyIdToken(idToken: string, checkIfRevoked: boolean): Promise<string>
  createProfile(idToken: string, name: string): Promise<string>
  getProfile(idToken: string): Promise<UserProfile>
}

export const userServiceManager = new DependencyManager<IUserService>(new UserService())
