import '../styles/globals.css';
import Link from 'next/link';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { setAnchorWrapper } from '@disclave/ui';
import { init } from '@disclave/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import { DefaultSeo } from 'next-seo';
import { SEO } from '@/consts';
import { AppHead } from '@/modules/head';
import React, { useEffect } from 'react';
import { swOnLoadEventListener } from '@/modules/sw';
import { useAnalytics } from '@/modules/analytics';
import { Provider } from 'next-auth/client';
import { AuthProvider } from '@/modules/auth/provider';
import { AuthCtx } from '@/modules/auth/provider/AuthCtx';

config.autoAddCss = false;

// TODO: move to useEffect?
const firebaseConfig = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG);
const domain = process.env.DOMAIN;

init(firebaseConfig, domain + '/api/graphql');

setAnchorWrapper((props) => (
  <Link href={props.href}>
    <a {...props} />
  </Link>
));

const Disclave = ({ Component, pageProps }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator)
      window.addEventListener('load', () => swOnLoadEventListener());
  }, []);

  useAnalytics();

  return (
    <>
      <Head>
        <title>Disclave</title>

        <AppHead />
      </Head>

      <DefaultSeo {...SEO} />

      <Provider session={pageProps.session}>
        <AuthProvider iframe={pageProps.iframe ?? false} session={pageProps.session}>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </>
  );
};

export default appWithTranslation(Disclave);
