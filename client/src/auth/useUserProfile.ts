import { useEffect, useState } from "react";
import { onAuthStateChanged, UserProfileModel } from "./";
import { getSelfProfile } from "../modules/users";

type Loading = boolean;
type UseUserProfile = [UserProfileModel | null, Loading];

export const useUserProfile = (): UseUserProfile => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState<UserProfileModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => onAuthStateChanged(setUser));

  useEffect(() => {
    setLoading(true);

    const updateProfile = (newProfile: UserProfileModel | null) => {
      setProfile(newProfile);
      setLoading(false);
    };

    if (user == null) {
      updateProfile(null);
      return;
    }

    const fetchUserProfile = async (user) => {
      const result = await getSelfProfile();

      const profile = {
        uid: user.id,
        email: user.email,
        name: result != null ? result.name : "",
        profileFillPending: result == null,
      };

      updateProfile(profile);
    };
  }, [user?.uid]);

  return [profile, loading];
};
