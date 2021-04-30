import React, { useEffect, useState } from "react";
import { SessionCtx, SessionCtxData } from "./SessionCtx";
import { asUserId, ProfileModel, UserModel } from "../models";
import { User } from "../../../firebase";
import { getSelfProfile, createSelfProfile } from "../../users/client";
import { usePopupAuthCallback, useUser } from "../hooks";
import { setAuthToken } from "../../../graphql";
import { sendVerificationEmail, updateUserCookie } from "../client";
import { logout } from "../index";

export interface SessionProviderProps {
  serverSideUid: string | null;
  manageAuthCookie: boolean;
  isIframe: boolean;
}

export const SessionProvider: React.FC<SessionProviderProps> = (props) => {
  const fbUser = useUser();
  const [uid, setUid] = useState<string | null>(props.serverSideUid);
  const [user, setUser] = useState<UserModel | null>();

  const updateUser = (userModel: UserModel | null) => {
    setUser(userModel);
    setUid(user ? user.uid : null);
  };

  const updateProfile = (profile: ProfileModel) => {
    if (!user) return;
    updateUser({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      profile: profile,
    });
  };

  const onPopupAuthChange = (user: UserModel, authToken: string) => {
    if (!props.isIframe) return;
    setAuthToken(authToken);
    updateUser(user);
  };
  usePopupAuthCallback(onPopupAuthChange);

  const fetchUserProfile = async (
    noCache: boolean
  ): Promise<ProfileModel | null> => {
    return await getSelfProfile(noCache);
  };

  const updateAuthToken = async (fbUser: User | null) => {
    if (!fbUser) {
      setAuthToken(null);
      return;
    }

    const idToken = await fbUser.getIdToken();
    setAuthToken(idToken);
  };

  const updateCookie = async () => {
    if (props.manageAuthCookie) await updateUserCookie();
  };

  const onAuthStateChanged = async (fbUser: User | null) => {
    await updateAuthToken(fbUser);
    await updateCookie();

    if (!fbUser) {
      updateUser(null);
      return;
    }

    const profile = await fetchUserProfile(fbUser.uid != user?.uid);
    updateUser({
      uid: asUserId(fbUser.uid),
      email: fbUser.email,
      emailVerified: fbUser.emailVerified,
      profile: profile,
    });
  };

  useEffect(() => {
    onAuthStateChanged(fbUser.user);
  }, [fbUser.user]);

  const onCreateProfile = async (name: string) => {
    const result = await createSelfProfile(name);
    updateProfile(result);
  };

  const onLogout = async () => {
    // TODO: handle alternative state if working on iframe without initialized firebase
    await logout();
  };

  const onSendVerificationEmail = async (redirectUrl?: string) => {
    await sendVerificationEmail(redirectUrl);
  };

  const ctxData: SessionCtxData = {
    user: user,
    uid: uid,
    actions: {
      createProfile: onCreateProfile,
      logout: onLogout,
      sendVerificationEmail: onSendVerificationEmail,
    },
  };

  return (
    <SessionCtx.Provider value={ctxData}>{props.children}</SessionCtx.Provider>
  );
};
