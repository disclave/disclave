import { useMemo } from "react";
import { UserProfileModel } from "../";
import { useUser, useUserProfile } from "./";

type IsLoading = boolean;
type IsActiveAccount = boolean;
type UpdateUserProfile = () => Promise<void>;
type UseUserProfile = [
  UserProfileModel | null,
  IsLoading,
  IsActiveAccount,
  UpdateUserProfile
];

export const useSession = (): UseUserProfile => {
  const user = useUser();
  const [profile, updateProfile] = useUserProfile();

  const loading = user === undefined || user?.uid != profile?.uid;

  const active = useMemo(() => profile != null && !profile.profileFillPending, [
    profile?.profileFillPending,
  ]);

  return [profile, loading, active, updateProfile];
};
