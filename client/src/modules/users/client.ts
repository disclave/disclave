import { client } from "../../graphql";
import { UserProfileModel } from "./";
import { CREATE_SELF_PROFILE, GET_SELF_PROFILE } from "./schemas";

export const getSelfProfile = async (
  noCache: boolean = false
): Promise<UserProfileModel | null> => {
  const result = await client().query({
    query: GET_SELF_PROFILE,
    fetchPolicy: noCache ? "network-only" : undefined,
  });
  const profile = result.data.getSelfProfile;
  if (profile == null) return null;
  return responseToModel(profile);
};

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
    uid: data.uid,
    name: data.name,
  };
};
