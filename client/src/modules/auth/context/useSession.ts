import { ProfileModel, UserModel } from "../models";
import { useContext } from "react";
import { SessionCtx } from "./SessionCtx";

type UseSession = {
  uid: string | null;
  user: UserModel | null;
  profile: ProfileModel | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: {
    createProfile: (name: string) => Promise<void>;
    logout: () => Promise<void>;
    sendVerificationEmail: (redirectUrl?: string) => Promise<void>;
  };
};

export const useSession = (): UseSession => {
  const {
    uid,
    user,
    actions: { createProfile, sendVerificationEmail, logout },
  } = useContext(SessionCtx);

  return {
    uid,
    user: user ? user : null,
    profile: user?.profile ? user.profile : null,
    isAuthenticated: !!user && !!user.profile,
    isLoading: user === undefined,
    actions: {
      createProfile,
      logout,
      sendVerificationEmail,
    },
  };
};
