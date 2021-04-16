import React from "react";
import { SessionModel } from "../models";

type LoginEmailPass = (email: string, password: string) => Promise<void>;
type LoginWithGoogle = (emailRedirectUrl?: string) => Promise<void>;
type LoginWithFacebook = (emailRedirectUrl?: string) => Promise<void>;
type RegisterEmailPass = (
  email: string,
  password: string,
  emailRedirectUrl?: string
) => Promise<void>;
type Logout = () => Promise<void>;
type SessionContextData = {
  session?: SessionModel | null;
  loginEmailPass: LoginEmailPass;
  loginWithGoogle: LoginWithGoogle;
  loginWithFacebook: LoginWithFacebook;
  registerEmailPass: RegisterEmailPass;
  logout: Logout;
};

export const SessionContext = React.createContext<SessionContextData>(
  undefined
);
