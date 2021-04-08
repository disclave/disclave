import React, { useEffect } from 'react';
import { login, loginWithFacebook, loginWithGoogle, logout, useSession } from '@disclave/client';
import { useRouter } from 'next/router';
import { redirectParamsToUrl, routerQueryToRedirectParams } from '@/modules/redirect';
import { registerHref } from '@/pages/auth/register';
import { LoginFormContainer } from '@disclave/ui';
import { Layout } from '@/modules/layout';

export const LoginPage: React.VFC = () => {
  const { profile, isLoading } = useSession();

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
    if (profile == null) return;

    const checkRedirects = async () => {
      if (profile.profileFillPending) {
        await redirectToRegisterPage();
        return;
      }

      if (redirectUrl) await router.push(redirectUrl);
      else if (window.opener) window.close();
    };

    checkRedirects();
  }, [profile]);

  const onLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  const onLogout = async () => {
    await logout();
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
        <LoginFormContainer
          onLogin={onLogin}
          onLogout={onLogout}
          onLoginFacebook={onFacebookLogin}
          onLoginGoogle={onGoogleLogin}
          registerHref={registerHrefWithRedirect}
          userProfile={!isLoading ? profile : undefined}
        />
      </section>
    </Layout>
  );
};
