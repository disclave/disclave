import { client } from "../../graphql";
import { LOGIN, LOGOUT, UPDATE_USER_COOKIE } from "./schemas";

export const updateUserCookie = async () => {
  await client().mutate({
    mutation: UPDATE_USER_COOKIE,
  });
};

export const login = async (idToken: string) => {
  await client().mutate({
    mutation: LOGIN,
    variables: {
      idToken: idToken,
    },
  });
};

export const logout = async () => {
  await client().mutate({
    mutation: LOGOUT,
  });
};
