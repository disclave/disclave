import { ProfileModel, UserModel } from "../models";
import { useContext } from "react";
import { SessionCtx } from "./SessionCtx";

type UseSession = {
  uid: string | null;
  user: UserModel | null;
  profile: ProfileModel | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const useSession = (): UseSession => {
  const { uid, user } = useContext(SessionCtx);

  return {
    uid,
    user: user ? user : null,
    profile: user?.profile ? user.profile : null,
    isAuthenticated: !!user && !!user.profile,
    isLoading: user === undefined,
  };
};
