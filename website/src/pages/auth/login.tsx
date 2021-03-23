import { login, logout, useSession } from '@webchat/client';
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
  const [userProfile, isLoadingProfile] = useSession();

  const router = useRouter();
  const redirectParams = routerQueryToRedirectParams(router.query);
  const redirectUrl = redirectParamsToUrl(redirectParams);

  const registerHrefWithRedirect = registerHref(
    redirectParams.redirectPath,
    redirectParams.redirectPathParamToEncode
  );

  const redirectToRegisterPage = async () => {
    await router.push(registerHrefWithRedirect);
  };

  useEffect(() => {
    if (userProfile == null) return;

    const checkRedirects = async () => {
      if (userProfile.profileFillPending) {
        await redirectToRegisterPage();
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
          registerHref={registerHrefWithRedirect}
          userProfile={!isLoadingProfile ? userProfile : undefined}
        />
      </div>
    </div>
  );
};
export default Login;
