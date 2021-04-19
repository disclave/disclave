import { client, runQuery } from "../../graphql";
import { GET_SESSION, LOGIN, LOGOUT, SEND_VERIFICATION_EMAIL } from "./schemas";
import { SessionModel } from "./models";
import { CommentModel } from "../comments";

export const getSession = async (
  noCache: boolean
): Promise<SessionModel | null> => {
  const result = await runQuery<Array<CommentModel>>(
    GET_SESSION,
    {},
    "session",
    noCache
  );
  if (!result) return null;
  return responseToModel(result);
};

export const login = async (idToken: string): Promise<SessionModel> => {
  const result = await client().mutate({
    mutation: LOGIN,
    variables: {
      idToken: idToken,
    },
  });
  return responseToModel(result.data.login);
};

export const sendVerificationEmail = async (
  redirectUrl?: string
): Promise<boolean> => {
  const result = await client().mutate({
    mutation: SEND_VERIFICATION_EMAIL,
    variables: {
      redirectUrl: redirectUrl,
    },
  });
  return result.data.sendVerificationEmail;
};

export const logout = async () => {
  await client().mutate({
    mutation: LOGOUT,
  });
};

const responseToModel = (data: any): SessionModel => {
  return {
    uid: data.uid,
    email: data.email,
    emailVerified: data.emailVerified,
    profile: data.profile
      ? {
          uid: data.profile.uid,
          name: data.profile.name,
        }
      : null,
  };
};
