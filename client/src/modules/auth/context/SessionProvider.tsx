import React, { useEffect, useState } from "react";
import { SessionCtx, SessionCtxData } from "./SessionCtx";
import { asUserId, ProfileModel, UserModel } from "../models";
import { User } from "../../../firebase";
import { getSelfProfile, createSelfProfile } from "../../users/client";
import { usePopupAuthCallback, useUser } from "../hooks";
import { setAuthToken as setApiAuthToken } from "../../../graphql";
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
  const [authToken, setAuthToken] = useState<string | null>();

  const updateUser = (userModel: UserModel | null) => {
    setUser(userModel);
    setUid(user ? user.uid : null);
  };

  const updateAuthToken = (token: string | null) => {
    setApiAuthToken(token);
    setAuthToken(token);
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
    updateAuthToken(authToken);
    updateUser(user);
  };
  usePopupAuthCallback(onPopupAuthChange);

  const fetchUserProfile = async (
    noCache: boolean
  ): Promise<ProfileModel | null> => {
    return await getSelfProfile(noCache);
  };

  const updateCookie = async () => {
    if (props.manageAuthCookie) await updateUserCookie();
  };

  const onAuthStateChanged = async (
    fbUser: User | null,
    token: string | null
  ) => {
    await updateAuthToken(token);
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
    onAuthStateChanged(fbUser.user, fbUser.idToken);
  }, [fbUser]);

  const onCreateProfile = async (name: string) => {
    const result = await createSelfProfile(name);
    updateProfile(result);
  };

  const onLogout = async () => {
    try {
      await logout();
    } finally {
      if (props.isIframe) {
        updateUser(null);
        updateAuthToken(null);
      }
    }
  };

  const onSendVerificationEmail = async (redirectUrl?: string) => {
    await sendVerificationEmail(redirectUrl);
  };

  const ctxData: SessionCtxData = {
    user: user,
    uid: uid,
    authToken: authToken,
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
