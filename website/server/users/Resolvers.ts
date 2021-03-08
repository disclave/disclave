import {container} from "../inversify.config";
import {TYPES} from "../types";
import {UserService} from "./index";

const service = container.get<UserService>(TYPES.IUserService)

export const usersResolvers = {
  Mutation: {
    createUserProfile: async (_, args) => {
      return await service.createProfile(
        args.uid,
        args.profile.name
      )
    }
  }
}
