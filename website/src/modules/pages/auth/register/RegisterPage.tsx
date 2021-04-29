import React, { useEffect } from 'react';
import { loginWithFacebook, loginWithGoogle, register, useSession } from '@disclave/client';
import { useRouter } from 'next/router';
import { redirectParamsToUrl, routerQueryToRedirectParams } from '@/modules/redirect';
import { RegisterFormContainer } from '@disclave/ui';
import { Layout } from '@/modules/layout';
import { loginHref } from '@/pages/auth/login';

export const RegisterPage: React.VFC = () => {
  const {
    user,
    profile,
    isLoading,
    actions: { logout, createProfile, sendVerificationEmail }
  } = useSession();

  const router = useRouter();
  const redirectParams = routerQueryToRedirectParams(router.query);
  const redirectUrl = redirectParamsToUrl(redirectParams);

  const loginHrefWithRedirect = loginHref(
    redirectParams.redirectPath,
    redirectParams.redirectPathParamToEncode
  );

  useEffect(() => {
    if (!profile) return;

    const checkRedirects = async () => {
      // TODO: validate and fix flow for popups register - should be similar to login flow
      if (redirectUrl) await router.push(redirectUrl);
      else if (window.opener) window.close();
    };

    checkRedirects();
  }, [profile]);

  const onRegisterEmailPass = async (email: string, password: string) => {
    await register(email, password, window.location.href);
  };

  const onCreateUsername = async (name: string) => {
    await createProfile(name);
  };

  const onLogout = async () => {
    await logout();
    await router.push(loginHref());
  };

  const onFacebookLogin = async () => {
    await loginWithFacebook(window.location.href);
  };
  const onGoogleLogin = async () => {
    await loginWithGoogle(window.location.href);
  };

  const onSendEmailVerification = async () => {
    await sendVerificationEmail(window.location.href);
  };

  return (
    <Layout>
      <section className="container mx-auto my-8 lg:mt-24 max-w-max">
        <RegisterFormContainer
          loading={isLoading}
          user={user}
          onRegisterEmailPass={onRegisterEmailPass}
          onRegisterGoogle={onGoogleLogin}
          onRegisterFacebook={onFacebookLogin}
          onCreateUsername={onCreateUsername}
          onLogout={onLogout}
          loginHref={loginHrefWithRedirect}
          onSendEmailVerification={onSendEmailVerification}
        />
      </section>
    </Layout>
  );
};
