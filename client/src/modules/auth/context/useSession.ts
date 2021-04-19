import { useContext } from "react";
import {
  FetchSession,
  LoginEmailPass,
  LoginWithFacebook,
  LoginWithGoogle,
  Logout,
  RegisterEmailPass,
  SessionContext,
  SetProfile,
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
  setProfile: SetProfile;
  fetchSession: FetchSession;
  actions: Actions;
};

export const useSession = (): UseSession => {
  const {
    session,
    setSession,
    setProfile,
    fetchSession,
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
    setProfile: setProfile,
    fetchSession: fetchSession,
    actions: {
      loginEmailPass,
      logout,
      loginWithFacebook,
      loginWithGoogle,
      registerEmailPass,
    },
  };
};
