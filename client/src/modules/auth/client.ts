import { client } from "../../graphql";
import { UPDATE_USER_COOKIE } from "./schemas";

export const updateUserCookie = async () => {
  await client().mutate({
    mutation: UPDATE_USER_COOKIE,
  });
};
