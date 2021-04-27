import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { redirectParamsToUrl, routerQueryToRedirectParams } from '@/modules/redirect';
import { registerHref } from '@/pages/auth/register';
import { LoginFormContainer } from '@disclave/ui';
import { Layout } from '@/modules/layout';
import { useUserProfile } from '@/modules/auth';
import { signIn } from 'next-auth/client';

export const LoginPage: React.VFC = () => {
  const { session, profile } = useUserProfile();

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
      if (!profile) {
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

  const onEmailLogin = async (email: string) => {
    // TODO: handle result
    const result = await signIn('email', { email, redirect: false });
  };

  const onVerificationCodeConfirm = async (email: string, token: string) => {
    // TODO: extract URL to separate builder method
    const url = `/api/auth/callback/email?email=${encodeURIComponent(
      email
    )}&token=${encodeURIComponent(token)}&callbackUrl=${redirectUrl}`;

    await router.push(url);
  };

  return (
    <Layout>
      <section className="container mx-auto my-8 lg:mt-24 max-w-max">
        <LoginFormContainer
          onEmailLogin={onEmailLogin}
          onVerificationCodeConfirm={onVerificationCodeConfirm}
        />
      </section>
    </Layout>
  );
};
