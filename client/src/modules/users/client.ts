import { client } from "../../graphql";
import { UserProfileModel } from "./";
import { CREATE_SELF_PROFILE } from "./schemas";

export const createSelfProfile = async (
  name: string
): Promise<UserProfileModel> => {
  const result = await client().mutate({
    mutation: CREATE_SELF_PROFILE,
    variables: {
      profile: {
        name,
      },
    },
  });
  return responseToModel(result.data.createSelfProfile);
};

const responseToModel = (data: any): UserProfileModel => {
  return {
    name: data.name,
  };
};
