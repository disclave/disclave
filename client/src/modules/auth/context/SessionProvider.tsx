import React, { useEffect, useState } from "react";
import { SessionContext } from "./SessionContext";
import { SessionModel } from "../models";
import { getSession } from "../client";

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

  useEffect(() => {
    if (savedSession != undefined) return;

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
