import React from "react";
import { UserModel } from "../models";

export interface SessionCtxData {
  uid: string | null;
  user?: UserModel | null;
  authToken: string | null;
  actions: {
    createProfile: (name: string) => Promise<void>;
    logout: () => Promise<void>;
    sendVerificationEmail: (redirectUrl?: string) => Promise<void>;
  };
}

export const SessionCtx = React.createContext<SessionCtxData>({
  uid: null,
  user: undefined,
  authToken: null,
  actions: {
    createProfile: () => {
      throw new Error("Session context not initialized");
    },
    logout: () => {
      throw new Error("Session context not initialized");
    },
    sendVerificationEmail: () => {
      throw new Error("Session context not initialized");
    },
  },
});
