import React, { useEffect } from 'react';
import { useSession } from '@disclave/client';
import { useRouter } from 'next/router';
import { redirectParamsToUrl, routerQueryToRedirectParams } from '@/modules/redirect';
import { registerHref } from '@/pages/auth/register';
import { LoginFormContainer } from '@disclave/ui';
import { Layout } from '@/modules/layout';

export const LoginPage: React.VFC = () => {
  const {
    session,
    actions: { loginEmailPass, logout, loginWithGoogle, loginWithFacebook }
  } = useSession();

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
    if (session == null) return;

    const checkRedirects = async () => {
      if (!session.emailVerified || !session.profile) {
        await redirectToRegisterPage();
        return;
      }

      if (redirectUrl) await router.push(redirectUrl);
      else if (window.opener) {
        // TODO: validate and fix flow for popups login

        // // TODO: validate window opener origin
        // console.log('window.opener', window.opener);
        // const idToken = await currentUser().getIdToken();
        // // TODO: change origin
        // window.opener.postMessage(JSON.stringify({ type: 'LOGIN', content: { idToken } }), '*');

        window.close();
      }
    };

    checkRedirects();
  }, [session]);

  const onLogin = async (email: string, password: string) => {
    await loginEmailPass(email, password);
  };

  const onLogout = async () => {
    await logout();
  };

  const onFacebookLogin = async () => {
    await loginWithFacebook(window.location.href);
  };
  const onGoogleLogin = async () => {
    await loginWithGoogle(window.location.href);
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
          session={session}
        />
      </section>
    </Layout>
  );
};
