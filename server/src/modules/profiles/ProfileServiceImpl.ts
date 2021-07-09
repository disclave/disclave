import { Profile } from "./Profile";
import { ProfileService } from "./index";
import { ProfileRepository, ProfileEntity } from "./db";
import { inject, injectable } from "inversify";
import {
  ProfileAlreadyExists,
  ProfileEmailNotVerified,
  ProfileUserAccountDisabled,
  UsernameInvalidCharacters,
  UsernameMaxLength,
  UsernameMinLength,
  UsernameNotAllowed,
  UsernameTaken,
} from "./exceptions";
import { AuthProvider, UserId } from "@/modules/auth";

@injectable()
export class ProfileServiceImpl implements ProfileService {
  @inject(ProfileRepository)
  private repository!: ProfileRepository;

  @inject(AuthProvider)
  private authProvider!: AuthProvider;

  public async createProfile(uid: UserId, name: string): Promise<Profile> {
    validateUserName(name);

    const user = await this.authProvider.getUser(uid);
    if (!user.emailVerified)
      throw ProfileEmailNotVerified(
        "Email address must be verified before creating a profile."
      );

    if (user.disabled)
      throw ProfileUserAccountDisabled("Your account is disabled");

    await this.repository.runTransaction(async (t) => {
      if (await this.repository.getProfile(user.uid))
        throw ProfileAlreadyExists(
          "Your profile already exists. Can not create it again."
        );

      if (await this.repository.existProfileByName(name, t))
        throw UsernameTaken(
          "Selected username is taken. Chose different name."
        );

      await this.repository.createProfile(
        user.uid,
        {
          name: name,
        },
        t
      );
    });

    return await this.repository.getProfile(user.uid) as Profile;
  }

  public async getProfile(uid: UserId): Promise<Profile | null> {
    const profile = await this.repository.getProfile(uid);
    if (profile == null) return null;
    return toDomain(profile);
  }
}

const toDomain = (entity: ProfileEntity): Profile => {
  return {
    uid: entity.uid,
    name: entity.name,
  };
};

const validateUserName = (name: string) => {
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
