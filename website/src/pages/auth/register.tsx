import { logout, useUserProfile } from '@webchat/client';
import { RegisterFormContainer } from '@webchat/ui';
import { useRouter } from 'next/router';
import { routerQueryToRedirectUrl, valuesToParamsArray } from '../../modules/redirect';
import { useEffect, useState } from 'react';

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
    // TODO: try to create user account with email and password
    // await login(email, password);
  };

  const onCreateUsername = async (name: string) => {
    // TODO: try to save user profile in DB
    // if (!redirectUrl) return;
    //
    // await router.push(redirectUrl);
  };

  const onLogout = async () => {
    await logout();
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
