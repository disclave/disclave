import { useEffect, useState } from "react";
import { onAuthStateChanged, UserProfileModel } from "./";

type Loading = boolean;
type UseUserProfile = [UserProfileModel | null, Loading];

export const useUserProfile = (): UseUserProfile => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState<UserProfileModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => onAuthStateChanged(setUser));

  useEffect(() => {
    if (user == null) {
      setProfile(null);
    } else {
      setProfile({
        uid: user.uid,
        email: user.email,
        name: user.email, // TODO: fetch user profile from DB and get user name instead of email
        profileFillPending: false, // TODO: fill based on user profile in DB
      });
    }

    setLoading(false);
  }, [user?.uid]);

  return [profile, loading];
};
