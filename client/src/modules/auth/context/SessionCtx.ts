import React from "react";
import { UserModel } from "../models";

export interface SessionCtxData {
  uid: string | null;
  user?: UserModel | null;
}

export const SessionCtx = React.createContext<SessionCtxData>(undefined);
