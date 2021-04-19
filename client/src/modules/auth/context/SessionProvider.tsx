import React, { useEffect, useState } from "react";
import { SessionContext } from "./SessionContext";
import { SessionModel } from "../models";
import {
  getSession,
  logout,
  loginEmailPass,
  registerEmailPass,
  loginWithFacebook,
  loginWithGoogle,
  applyActionCode,
} from "../../auth";
import { UserProfileModel } from "../../users";

export interface SessionProviderProps {
  savedSession?: SessionModel | null;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  savedSession,
  children,
}) => {
  const [session, setSession] = useState<SessionModel | null>(savedSession);

  const fetchSession = async (noCache: boolean) => {
    const result = await getSession(noCache);
    setSession(result);
  };

  const onSetProfile = (profile: UserProfileModel | null) => {
    if (!session) throw "Can not set profile if session does not exist";

    setSession({
      ...session,
      profile: profile,
    });
  };

  const onFetchSession = async () => {
    await fetchSession(true);
  };

  const onLoginEmailPass = async (email: string, password: string) => {
    const result = await loginEmailPass(email, password);
    setSession(result);
  };

  const onLoginWithGoogle = async (emailRedirectUrl?: string) => {
    const result = await loginWithGoogle(emailRedirectUrl);
    setSession(result);
  };

  const onLoginWithFacebook = async (emailRedirectUrl?: string) => {
    const result = await loginWithFacebook(emailRedirectUrl);
    setSession(result);
  };

  const onRegisterEmailPass = async (
    email: string,
    password: string,
    emailRedirectUrl?: string
  ) => {
    const result = await registerEmailPass(email, password, emailRedirectUrl);
    setSession(result);
  };

  const onLogout = async () => {
    await logout();
    setSession(null);
  };

  const onConfirmEmail = async (actionCode: string) => {
    await applyActionCode(actionCode);
    setSession({
      ...session,
      emailVerified: true,
    });
  };

  useEffect(() => {
    if (session != undefined) return;

    fetchSession(false);
  }, []);

  const sessionContextData = {
    session: session,
    setSession: setSession,
    setProfile: onSetProfile,
    fetchSession: onFetchSession,
    actions: {
      loginEmailPass: onLoginEmailPass,
      loginWithGoogle: onLoginWithGoogle,
      loginWithFacebook: onLoginWithFacebook,
      registerEmailPass: onRegisterEmailPass,
      logout: onLogout,
      confirmEmail: onConfirmEmail,
    },
  };

  return (
    <SessionContext.Provider value={sessionContextData}>
      {children}
    </SessionContext.Provider>
  );
};
