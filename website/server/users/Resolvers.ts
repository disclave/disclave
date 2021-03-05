import {UserService} from "./UserService"

const service = new UserService()

export const resolvers = {
  Mutation: {
    createUserProfile: async (_, args) => {
      await service.createProfile(
        args.uid,
        args.profile.name
      )
    }
  }
}
