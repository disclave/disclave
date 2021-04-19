import { useContext } from "react";
import {
  FetchSession,
  SessionContext,
  SetProfile,
  SetSession,
  Actions,
} from "./SessionContext";
import { SessionModel } from "../models";
import { UserProfileModel } from "../../users";

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
    actions: {
      logout,
      loginEmailPass,
      registerEmailPass,
      loginWithGoogle,
      loginWithFacebook,
      confirmEmail,
    },
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
      confirmEmail,
    },
  };
};
