import { useUser } from '@auth0/nextjs-auth0';

export interface UserProfileModel {
  name: string;
}

export interface UserModel {
  email: string;
  emailVerified: boolean;
  profile: UserProfileModel | null;
}

export type UseUserProfile = {
  user: UserModel | null;
  checkSession: () => Promise<void>;
  error?: Error;
  isLoading: boolean;
};

export const useUserProfile = (): UseUserProfile => {
  const { user, checkSession, error, isLoading } = useUser();

  const userModel: UserModel | null = user
    ? {
        email: user.email!,
        emailVerified: user.email_verified ?? false,
        profile: null // TODO: update profile
      }
    : null;

  return {
    user: userModel,
    checkSession,
    error,
    isLoading
  };
};
