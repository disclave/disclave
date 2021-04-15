import { client } from "../../graphql";
import { LOGIN, LOGOUT } from "./schemas";

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
