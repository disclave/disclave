import React, { useEffect, useState } from "react";
import { SessionContext } from "./SessionContext";
import { SessionModel } from "../models";
import { getSession, logout } from "../client";

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
    logout: onLogout,
  };

  return (
    <SessionContext.Provider value={sessionContextData}>
      {children}
    </SessionContext.Provider>
  );
};
