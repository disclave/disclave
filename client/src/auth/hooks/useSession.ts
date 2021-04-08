import { useMemo } from "react";
import { UserProfileModel } from "../";
import { useUser, useUserProfile } from "./";

type UpdateUserProfile = () => Promise<void>;
type SendEmailVerification = () => Promise<void>;
type UseUserProfile = {
  profile: UserProfileModel | null;
  isLoading: boolean;
  isCompleted: boolean;
  updateProfile: UpdateUserProfile;
  sendEmailVerification: SendEmailVerification;
};

export const useSession = (): UseUserProfile => {
  const { user, sendEmailVerification } = useUser();
  const [profile, updateProfile] = useUserProfile();

  const loading = user === undefined || user?.uid != profile?.uid;

  const completed = useMemo(
    () => profile != null && !profile.profileFillPending,
    [profile?.profileFillPending]
  );

  return {
    profile: profile,
    isLoading: loading,
    isCompleted: completed,
    updateProfile: updateProfile,
    sendEmailVerification: sendEmailVerification,
  };
};
