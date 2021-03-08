import {container} from "../inversify.config";
import {TYPES} from "../types";
import {IUserService} from "./index";

const service = container.get<IUserService>(TYPES.IUserService)

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
