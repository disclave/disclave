import React, { useEffect, useState } from "react";
import { SessionCtx, SessionCtxData } from "./SessionCtx";
import { asUserId, ProfileModel, UserModel } from "../models";
import { User } from "../../../firebase";
import { getSelfProfile } from "../../users/client";
import { usePopupAuthCallback, useUser } from "../hooks";
import { setAuthToken } from "../../../graphql";

export interface SessionProviderProps {
  serverSideUid: string | null;
  manageAuthCookie: boolean;
}

export const SessionProvider: React.FC<SessionProviderProps> = (props) => {
  const fbUser = useUser();
  const [uid, setUid] = useState<string | null>(props.serverSideUid);
  const [user, setUser] = useState<UserModel | null>();

  const updateUser = (userModel: UserModel | null) => {
    setUser(userModel);
    setUid(user ? user.uid : null);
  };

  const onPopupAuthChange = (user: UserModel) => {
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

  const updateUserCookie = async () => {
    if (props.manageAuthCookie) await updateUserCookie();
  };

  const onAuthStateChanged = async (fbUser: User | null) => {
    await updateAuthToken(fbUser);
    await updateUserCookie();

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

  const ctxData: SessionCtxData = {
    user: user,
    uid: uid,
  };

  return (
    <SessionCtx.Provider value={ctxData}>{props.children}</SessionCtx.Provider>
  );
};
