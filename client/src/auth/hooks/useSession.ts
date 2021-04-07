import { useMemo } from "react";
import { UserProfileModel } from "../";
import { useUser, useUserProfile } from "./";

type UpdateUserProfile = () => Promise<void>;
type UseUserProfile = {
  profile: UserProfileModel | null,
  isLoading: boolean,
  isEmailVerified: boolean,
  isCompleted: boolean,
  updateProfile: UpdateUserProfile
};

export const useSession = (): UseUserProfile => {
  const user = useUser();
  const [profile, updateProfile] = useUserProfile();

  const loading = user === undefined || user?.uid != profile?.uid;

  const completed = useMemo(() => profile != null && !profile.profileFillPending, [
    profile?.profileFillPending,
  ]);

  return {
    profile: profile,
    isLoading: loading,
    isEmailVerified: user.emailVerified,
    isCompleted: completed,
    updateProfile: updateProfile
  };
};
