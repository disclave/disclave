import { UserProfile } from "./UserProfile";
import { UserService } from "./index";
import { UserRepository, UserProfileEntity } from "./db";
import { inject, injectable } from "inversify";
import { AuthProvider } from "../auth";
import {
  ProfileAlreadyExists,
  UsernameInvalidCharacters,
  UsernameMaxLength,
  UsernameMinLength,
  UsernameNotAllowed,
  UsernameTaken,
} from "./exceptions";

@injectable()
export class UserServiceImpl implements UserService {
  @inject(AuthProvider)
  private auth: AuthProvider;

  @inject(UserRepository)
  private repository: UserRepository;

  public async verifyIdToken(
    idToken: string,
    checkIfRevoked: boolean = false
  ): Promise<string> {
    const token = await this.auth.verifyIdToken(idToken, checkIfRevoked);
    return token.uid;
  }

  public async createProfile(
    idToken: string,
    name: string
  ): Promise<UserProfile> {
    validateUserName(name);

    const uid = await this.verifyIdToken(idToken);
    const user = await this.repository.getUser(uid);
    // TODO: is this check required? can user with disabled account generate the idToken?
    if (user.disabled) throw "User account is disabled";

    await this.repository.runTransaction(async (t) => {
      if (await this.repository.existProfileByName(name, t))
        throw UsernameTaken(
          "Selected username is taken. Chose different name."
        );

      if (await this.repository.getUserProfile(uid))
        throw ProfileAlreadyExists(
          "Your profile already exists. Can not create it again."
        );

      await this.repository.createProfile(
        uid,
        {
          name: name,
        },
        t
      );
    });

    return await this.repository.getUserProfile(uid);
  }

  public async getProfile(idToken: string): Promise<UserProfile | null> {
    const uid = await this.verifyIdToken(idToken);
    const profile = await this.repository.getUserProfile(uid);
    if (profile == null) return null;
    return toDomain(profile);
  }
}

const toDomain = (entity: UserProfileEntity): UserProfile => {
  return {
    id: entity.id,
    name: entity.name,
  };
};

const validateUserName = (name: string) => {
  // TODO: add validation for reserved names, like admin, moderator or platform name

  const minLen = 4;
  const maxLen = 15;

  if (name.length < minLen)
    throw UsernameMinLength(
      `The username must be at least ${minLen} characters long.`
    );

  if (name.length > maxLen)
    throw UsernameMaxLength(`The username cannot exceed ${maxLen} characters.`);

  const charsRgx = /^[a-zA-Z0-9_]+$/i;
  if (!charsRgx.test(name))
    throw UsernameInvalidCharacters(
      "The username can only contain alphanumeric characters and underscore (A-Z, a-z, 0-9 and _)."
    );

  const notAllowedStrings = ["disclave", "admin", "moderator"];
  const notAllowedRgx = new RegExp(notAllowedStrings.join("|"), "i");
  if (notAllowedRgx.test(name))
    throw UsernameNotAllowed(
      "The username can not include words like 'Disclave', 'Admin' or 'Moderator'."
    );
};
