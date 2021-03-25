import { register, logout, useSession, createSelfProfile } from '@webchat/client';
import { RegisterFormContainer } from '@webchat/ui';
import { useRouter } from 'next/router';
import {
  redirectParamsToUrl,
  routerQueryToRedirectParams,
  valuesToParamsArray
} from '../../modules/redirect';
import { useEffect, useState } from 'react';
import { loginHref } from './login';

export const registerHref = (redirectPath?: string, redirectPathParamToEncode?: string): string => {
  let path = '/auth/register';

  const params = valuesToParamsArray(redirectPath, redirectPathParamToEncode);
  if (params.length) path += '?' + params.join('&');

  return path;
};

const Register = () => {
  const [userProfile, isLoadingProfile, isActiveAccount, updateUserProfile] = useSession();

  const router = useRouter();
  const redirectParams = routerQueryToRedirectParams(router.query);
  const redirectUrl = redirectParamsToUrl(redirectParams);

  const loginHrefWithRedirect = loginHref(
    redirectParams.redirectPath,
    redirectParams.redirectPathParamToEncode
  );

  useEffect(() => {
    if (!isActiveAccount) return;

    const checkRedirects = async () => {
      if (redirectUrl) await router.push(redirectUrl);
      else if (window.opener) window.close();
    };

    checkRedirects();
  }, [isActiveAccount]);

  const onRegisterEmailPass = async (email: string, password: string) => {
    await register(email, password);
  };

  const onCreateUsername = async (name: string) => {
    await createSelfProfile(name);
    await updateUserProfile();
  };

  const onLogout = async () => {
    await logout();
    await router.push(loginHref());
  };

  return (
    <div className="w-screen h-screen">
      <div className="mx-auto mt-16 max-w-max">
        <RegisterFormContainer
          loading={isLoadingProfile}
          userProfile={userProfile}
          onRegisterEmailPass={onRegisterEmailPass}
          onCreateUsername={onCreateUsername}
          onLogout={onLogout}
          loginHref={loginHrefWithRedirect}
        />
      </div>
    </div>
  );
};
export default Register;
