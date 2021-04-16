import React from 'react';
import { useSession } from '@disclave/client';
import { useRouter } from 'next/router';
import { routerQueryToRedirectParams } from '@/modules/redirect';
import { loginHref } from '@/pages/auth/login';
import { RegisterFormContainer } from '@disclave/ui';
import { Layout } from '@/modules/layout';

export const RegisterPage: React.VFC = () => {
  const {
    isLoading,
    session,
    actions: { registerEmailPass, logout, loginWithGoogle, loginWithFacebook }
  } = useSession();

  const router = useRouter();
  const redirectParams = routerQueryToRedirectParams(router.query);
  // const redirectUrl = redirectParamsToUrl(redirectParams);

  const loginHrefWithRedirect = loginHref(
    redirectParams.redirectPath,
    redirectParams.redirectPathParamToEncode
  );

  // TODO: verify and resotre
  // useEffect(() => {
  //   if (!isCompleted) return;
  //
  //   const checkRedirects = async () => {
  //     if (redirectUrl) await router.push(redirectUrl);
  //     else if (window.opener) window.close();
  //   };
  //
  //   checkRedirects();
  // }, [isCompleted]);

  const onRegisterEmailPass = async (email: string, password: string) => {
    await registerEmailPass(email, password, window.location.href);
  };

  const onCreateUsername = async (name: string) => {
    // TODO: fix
    // await createSelfProfile(name);
    // await updateProfile();
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
          loading={isLoading}
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
