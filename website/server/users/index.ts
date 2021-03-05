import {UserProfile} from "./UserProfile";
import {UserService} from "./UserService";

export interface IUserService {
  verifyIdToken(idToken: string, checkIfRevoked: boolean): Promise<string>
  createProfile(idToken: string, name: string): Promise<string>
  getProfile(idToken: string): Promise<UserProfile>
}

let service: IUserService = new UserService()
export const setUserService = (instance: IUserService) => {
  service = instance
}
export const getUserService = (): IUserService => service
