import {container} from "../inversify.config";
import {UserService} from "./index";

const service = container.get(UserService)

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
