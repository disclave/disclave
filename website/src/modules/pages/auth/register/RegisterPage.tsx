import React, { useEffect } from 'react';
import { createSelfProfile } from '@disclave/client';
import { useRouter } from 'next/router';
import { redirectParamsToUrl, routerQueryToRedirectParams } from '@/modules/redirect';
import { RegisterFormContainer } from '@disclave/ui';
import { Layout } from '@/modules/layout';
import { useUserProfile } from '@/modules/auth';
import { signOut } from 'next-auth/client';

export const RegisterPage: React.VFC = () => {
  const { session, profile } = useUserProfile();

  const router = useRouter();
  const redirectParams = routerQueryToRedirectParams(router.query);
  const redirectUrl = redirectParamsToUrl(redirectParams);

  useEffect(() => {
    if (!profile) return;

    const checkRedirects = async () => {
      // TODO: validate and fix flow for popups register
      if (redirectUrl) await router.push(redirectUrl);
      else if (window.opener) window.close();
    };

    checkRedirects();
  }, [profile]);

  const onCreateUsername = async (name: string) => {
    const profile = await createSelfProfile(name);
    // TODO: refresh session?
  };

  const onLogout = async () => {
    await signOut();
    // TODO: restore redirect?
    // await router.push(loginHref());
  };

  return (
    <Layout>
      <section className="container mx-auto my-8 lg:mt-24 max-w-max">
        <RegisterFormContainer
          user={session?.user}
          profile={profile}
          onCreateUsername={onCreateUsername}
          onLogout={onLogout}
        />
      </section>
    </Layout>
  );
};
