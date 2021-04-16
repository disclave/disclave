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
} from "../../auth";

export interface SessionProviderProps {
  savedSession?: SessionModel | null;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  savedSession,
  children,
}) => {
  const [session, setSession] = useState<SessionModel | null>(savedSession);

  const fetchSession = async () => {
    const result = await getSession(false);
    setSession(result);
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

  useEffect(() => {
    if (savedSession != undefined) return;

    fetchSession();
  }, []);

  const sessionContextData = {
    session: session,
    loginEmailPass: onLoginEmailPass,
    loginWithGoogle: onLoginWithGoogle,
    loginWithFacebook: onLoginWithFacebook,
    registerEmailPass: onRegisterEmailPass,
    logout: onLogout,
  };

  return (
    <SessionContext.Provider value={sessionContextData}>
      {children}
    </SessionContext.Provider>
  );
};
