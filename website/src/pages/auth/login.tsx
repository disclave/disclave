import { login, logout, useUserProfile } from '@webchat/client';
import { LoginFormContainer } from '@webchat/ui';
import { useRouter } from 'next/router';
import {
  redirectParamsToUrl,
  routerQueryToRedirectParams,
  valuesToParamsArray
} from '../../modules/redirect';
import { registerHref } from './register';
import { useEffect } from 'react';

export const loginHref = (redirectPath?: string, redirectPathParamToEncode?: string): string => {
  let path = '/auth/login';

  const params = valuesToParamsArray(redirectPath, redirectPathParamToEncode);
  if (params.length) path += '?' + params.join('&');

  return path;
};

const Login = () => {
  const [userProfile, loadingProfile] = useUserProfile();

  const router = useRouter();
  const redirectParams = routerQueryToRedirectParams(router.query);
  const redirectUrl = redirectParamsToUrl(redirectParams);

  useEffect(() => {
    if (userProfile == null) return;

    const checkRedirects = async () => {
      if (userProfile.profileFillPending) {
        await router.push(
          registerHref(redirectParams.redirectPath, redirectParams.redirectPathParamToEncode)
        );
        return;
      }

      if (!redirectUrl) return;

      await router.push(redirectUrl);
    };

    checkRedirects();
  }, [userProfile]);

  const onLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  const onLogout = async () => {
    await logout();
  };

  return (
    <div className="w-screen h-screen">
      <div className="mx-auto mt-16 max-w-max">
        <LoginFormContainer
          onLogin={onLogin}
          onLogout={onLogout}
          userProfile={!loadingProfile ? userProfile : undefined}
        />
      </div>
    </div>
  );
};
export default Login;
