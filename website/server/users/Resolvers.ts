import {UserService} from "./UserService"

const service = new UserService()

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
