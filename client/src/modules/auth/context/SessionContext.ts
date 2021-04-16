import React from "react";
import { SessionModel } from "../models";

export type SetSession = (session: SessionModel | null) => void;
export type LoginEmailPass = (email: string, password: string) => Promise<void>;
export type LoginWithGoogle = (emailRedirectUrl?: string) => Promise<void>;
export type LoginWithFacebook = (emailRedirectUrl?: string) => Promise<void>;
export type RegisterEmailPass = (
  email: string,
  password: string,
  emailRedirectUrl?: string
) => Promise<void>;
export type Logout = () => Promise<void>;

type SessionContextData = {
  session?: SessionModel | null;
  setSession: SetSession;
  loginEmailPass: LoginEmailPass;
  loginWithGoogle: LoginWithGoogle;
  loginWithFacebook: LoginWithFacebook;
  registerEmailPass: RegisterEmailPass;
  logout: Logout;
};

export const SessionContext = React.createContext<SessionContextData>(
  undefined
);
