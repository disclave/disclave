import React, { useEffect } from 'react';
import { createSelfProfile } from '@disclave/client';
import { useRouter } from 'next/router';
import { redirectParamsToUrl, routerQueryToRedirectParams } from '@/modules/redirect';
import { loginHref } from '@/pages/auth/login';
import { RegisterFormContainer } from '@disclave/ui';
import { Layout } from '@/modules/layout';
import { useUserProfile } from '@/modules/auth';

export const RegisterPage: React.VFC = () => {
  const { user } = useUserProfile();

  const router = useRouter();
  const redirectParams = routerQueryToRedirectParams(router.query);
  const redirectUrl = redirectParamsToUrl(redirectParams);

  const loginHrefWithRedirect = loginHref(
    redirectParams.redirectPath,
    redirectParams.redirectPathParamToEncode
  );

  useEffect(() => {
    if (!user?.profile) return;

    const checkRedirects = async () => {
      // TODO: validate and fix flow for popups register
      if (redirectUrl) await router.push(redirectUrl);
      else if (window.opener) window.close();
    };

    checkRedirects();
  }, [user?.profile]);

  const onRegisterEmailPass = async (email: string, password: string) => {
    await registerEmailPass(email, password, window.location.href);
  };

  const onCreateUsername = async (name: string) => {
    const profile = await createSelfProfile(name);
    setProfile(profile);
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
    // TODO: fix
    // await sendEmailVerification(window.location.href);
  };

  return (
    <Layout>
      <section className="container mx-auto my-8 lg:mt-24 max-w-max">
        <RegisterFormContainer
          session={session}
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
