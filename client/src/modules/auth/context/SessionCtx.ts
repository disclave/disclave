import React from "react";
import { UserModel } from "../models";

export interface SessionCtxData {
  uid: string | null;
  user?: UserModel | null;
  actions: {
    createProfile: (name: string) => Promise<void>;
    logout: () => Promise<void>;
    sendVerificationEmail: (redirectUrl?: string) => Promise<void>;
  };
}

export const SessionCtx = React.createContext<SessionCtxData>(undefined);
