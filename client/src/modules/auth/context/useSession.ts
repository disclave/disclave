import { useContext } from "react";
import { SessionContext } from "./SessionContext";
import { SessionModel } from "../models";
import { UserProfileModel } from "../../users";

type LoginEmailPass = (email: string, password: string) => Promise<void>;
type LoginWithGoogle = (emailRedirectUrl?: string) => Promise<void>;
type LoginWithFacebook = (emailRedirectUrl?: string) => Promise<void>;
type RegisterEmailPass = (
  email: string,
  password: string,
  emailRedirectUrl?: string
) => Promise<void>;
type Logout = () => Promise<void>;

type Actions = {
  loginEmailPass: LoginEmailPass;
  loginWithGoogle: LoginWithGoogle;
  loginWithFacebook: LoginWithFacebook;
  registerEmailPass: RegisterEmailPass;
  logout: Logout;
};

type UseSession = {
  isLoading: boolean;
  profile: UserProfileModel | null;
  session: SessionModel | null;
  actions: Actions;
};

export const useSession = (): UseSession => {
  const {
    session,
    logout,
    loginEmailPass,
    registerEmailPass,
    loginWithGoogle,
    loginWithFacebook,
  } = useContext(SessionContext);

  return {
    isLoading: session == undefined,
    profile: session ? session.profile : null,
    session: session ?? null,
    actions: {
      loginEmailPass,
      logout,
      loginWithFacebook,
      loginWithGoogle,
      registerEmailPass,
    },
  };
};
