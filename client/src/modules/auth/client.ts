import { client } from "../../graphql";
import { SEND_VERIFICATION_EMAIL, UPDATE_USER_COOKIE } from "./schemas";

export const updateUserCookie = async (): Promise<Boolean> => {
  const result = await client().mutate({
    mutation: UPDATE_USER_COOKIE,
  });
  return result.data.updateUserCookie;
};

export const sendVerificationEmail = async (
  redirectUrl?: string
): Promise<Boolean> => {
  const result = await client().mutate({
    mutation: SEND_VERIFICATION_EMAIL,
    variables: {
      redirectUrl,
    },
  });
  return result.data.updateUserCookie;
};
