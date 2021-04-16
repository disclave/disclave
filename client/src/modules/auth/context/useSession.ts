import { useContext } from "react";
import {
  LoginEmailPass,
  LoginWithFacebook,
  LoginWithGoogle,
  Logout,
  RegisterEmailPass,
  SessionContext,
  SetSession,
} from "./SessionContext";
import { SessionModel } from "../models";
import { UserProfileModel } from "../../users";

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
  setSession: SetSession;
  actions: Actions;
};

export const useSession = (): UseSession => {
  const {
    session,
    setSession,
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
    setSession: setSession,
    actions: {
      loginEmailPass,
      logout,
      loginWithFacebook,
      loginWithGoogle,
      registerEmailPass,
    },
  };
};
