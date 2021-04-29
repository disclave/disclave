import { useEffect, useState } from "react";
import { asUserId, ProfileModel, UserModel } from "../models";
import { auth, User } from "../../../firebase";
import { getSelfProfile } from "../../users/client";

type UseSession = {
  user: UserModel | null;
  profile: ProfileModel | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const useSession = (): UseSession => {
  const [user, setUser] = useState<UserModel | undefined | null>(undefined);

  const fetchUserProfile = async (
    noCache: boolean
  ): Promise<ProfileModel | null> => {
    return await getSelfProfile(noCache);
  };

  const onAuthStateChanged = async (fbUser: User | null) => {
    // TODO: update user cookie
    // TODO: update gql auth token

    if (!fbUser) {
      setUser(null);
      return;
    }

    const profile = await fetchUserProfile(fbUser.uid != user?.uid);

    setUser({
      uid: asUserId(fbUser.uid),
      email: fbUser.email,
      emailVerified: fbUser.emailVerified,
      profile: profile,
    });
  };

  useEffect(() => auth().onAuthStateChanged(onAuthStateChanged), []);

  return {
    user: user ? user : null,
    profile: user?.profile ? user.profile : null,
    isAuthenticated: !!user && !!user.profile,
    isLoading: user === undefined,
  };
};
