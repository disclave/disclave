import {IUserService, UserProfile} from "../../server/users";

export class UserServiceMock implements IUserService {
  createProfile(idToken: string, name: string): Promise<string> {
    return Promise.resolve("");
  }

  getProfile(idToken: string): Promise<UserProfile> {
    return Promise.resolve(undefined);
  }

  verifyIdToken(idToken: string, checkIfRevoked: boolean): Promise<string> {
    return Promise.resolve("");
  }

}