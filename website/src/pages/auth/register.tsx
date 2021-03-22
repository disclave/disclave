import { register, logout, useSession, createSelfProfile } from '@webchat/client';
import { RegisterFormContainer } from '@webchat/ui';
import { useRouter } from 'next/router';
import { routerQueryToRedirectUrl, valuesToParamsArray } from '../../modules/redirect';
import { useEffect, useState } from 'react';
import { loginHref } from './login';

export const registerHref = (redirectPath?: string, redirectPathParamToEncode?: string): string => {
  let path = '/auth/register';

  const params = valuesToParamsArray(redirectPath, redirectPathParamToEncode);
  if (params.length) path += '?' + params.join('&');

  return path;
};

const Register = () => {
  const [loading, setLoading] = useState(true);
  const [userProfile, isLoadingProfile, isActiveAccount, updateUserProfile] = useSession();

  useEffect(() => {
    setLoading(isLoadingProfile);
  }, [isLoadingProfile]);

  const router = useRouter();
  const redirectUrl = routerQueryToRedirectUrl(router.query);

  useEffect(() => {
    if (!isActiveAccount || !redirectUrl) return;

    const runRedirects = async () => {
      await router.push(redirectUrl);
    };

    runRedirects();
  }, [isActiveAccount]);

  const onRegisterEmailPass = async (email: string, password: string) => {
    setLoading(true);
    await register(email, password);
  };

  const onCreateUsername = async (name: string) => {
    setLoading(true);
    await createSelfProfile(name);
    await updateUserProfile();
    setLoading(false);
  };

  const onLogout = async () => {
    await logout();
    await router.push(loginHref());
  };

  return (
    <div className="w-screen h-screen">
      <div className="mx-auto mt-16 max-w-max">
        <RegisterFormContainer
          loading={loading}
          userProfile={userProfile}
          onRegisterEmailPass={onRegisterEmailPass}
          onCreateUsername={onCreateUsername}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
};
export default Register;
