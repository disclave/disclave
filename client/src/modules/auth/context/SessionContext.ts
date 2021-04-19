import React from "react";
import { SessionModel } from "../models";
import { UserProfileModel } from "../../users";

export type SetSession = (session: SessionModel | null) => void;
export type SetProfile = (profile: UserProfileModel | null) => void;
export type FetchSession = () => Promise<void>;
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
  setProfile: SetProfile;
  fetchSession: FetchSession;
  loginEmailPass: LoginEmailPass;
  loginWithGoogle: LoginWithGoogle;
  loginWithFacebook: LoginWithFacebook;
  registerEmailPass: RegisterEmailPass;
  logout: Logout;
};

export const SessionContext = React.createContext<SessionContextData>(
  undefined
);
