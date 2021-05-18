import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { redirectParamsToUrl, routerQueryToRedirectParams } from '@/modules/redirect';
import { registerHref } from '@/pages/auth/register';
import { LoginFormContainer } from '@disclave/ui';
import { Layout } from '@/modules/layout';
import {
  login,
  loginWithFacebook,
  loginWithGoogle,
  MessageType,
  sendMessage,
  SessionMessage,
  useSession
} from '@disclave/client';
import { privacyPolicyHref } from '@/pages/privacy-policy';
import { acceptableUsePolicyHref } from '@/pages/acceptable-use-policy';

export const LoginPage: React.VFC = () => {
  const {
    user,
    profile,
    authToken,
    actions: { logout }
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
    if (user == null) return;

    const checkRedirects = async () => {
      if (!profile) {
        await redirectToRegisterPage();
        return;
      }

      if (redirectUrl) await router.push(redirectUrl);
      else if (window.opener) {
        const message: SessionMessage = {
          user,
          authToken
        };
        sendMessage(window.opener, MessageType.SESSION, message);
        window.close();
      }
    };

    checkRedirects();
  }, [user]);

  const onLogin = async (email: string, password: string) => {
    await login(email, password);
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
          onLogout={logout}
          onLoginFacebook={onFacebookLogin}
          onLoginGoogle={onGoogleLogin}
          registerHref={registerHrefWithRedirect}
          privacyPolicyHref={privacyPolicyHref()}
          usePolicyHref={acceptableUsePolicyHref()}
          userProfile={profile}
        />
      </section>
    </Layout>
  );
};
