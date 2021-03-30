import React, { useEffect } from 'react';
import {
  createSelfProfile,
  loginWithFacebook,
  loginWithGoogle,
  logout,
  register,
  useSession
} from '@disclave/client';
import { useRouter } from 'next/router';
import { redirectParamsToUrl, routerQueryToRedirectParams } from '@/modules/redirect';
import { loginHref } from '@/pages/auth/login';
import { RegisterFormContainer } from '@disclave/ui';
import { Layout } from '@/modules/layout';

export const RegisterPage: React.VFC = () => {
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

  const onFacebookLogin = async () => {
    await loginWithFacebook();
  };
  const onGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <Layout>
      <section className="container mx-auto my-8 lg:mt-24 max-w-max">
        <RegisterFormContainer
          loading={isLoadingProfile}
          userProfile={userProfile}
          onRegisterEmailPass={onRegisterEmailPass}
          onRegisterGoogle={onGoogleLogin}
          onRegisterFacebook={onFacebookLogin}
          onCreateUsername={onCreateUsername}
          onLogout={onLogout}
          loginHref={loginHrefWithRedirect}
        />
      </section>
    </Layout>
  );
};
