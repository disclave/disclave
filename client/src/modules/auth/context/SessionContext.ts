import React from "react";
import { SessionModel } from "../models";

type SessionContextData = {
  session?: SessionModel | null;
  logout: () => Promise<void>;
};

export const SessionContext = React.createContext<SessionContextData>(
  undefined
);
