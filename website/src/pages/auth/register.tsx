import { register, logout, useUserProfile, createSelfProfile } from '@webchat/client';
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
  const [userProfile, loadingProfile] = useUserProfile();

  useEffect(() => {
    setLoading(loadingProfile);
  }, [loadingProfile]);

  const router = useRouter();
  const redirectUrl = routerQueryToRedirectUrl(router.query);

  const onRegisterEmailPass = async (email: string, password: string) => {
    setLoading(true);
    await register(email, password);
  };

  const onCreateUsername = async (name: string) => {
    setLoading(true);
    await createSelfProfile(name);

    if (!redirectUrl) return;

    await router.push(redirectUrl);
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
