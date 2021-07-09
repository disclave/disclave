import '../styles/globals.css';
import Link from 'next/link';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { setAnchorWrapper } from '@disclave/ui';
import { init, SessionProvider } from '@disclave/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import { DefaultSeo } from 'next-seo';
import { AppTitle, SEO } from '@/consts';
import { AppHead } from '@/modules/head';
import React, { useEffect } from 'react';
import { swOnLoadEventListener } from '@/modules/sw';
import { useAnalytics } from '@/modules/analytics';
import { CookieBanner } from '@/modules/cookies';
import { AppProps } from 'next/app';

config.autoAddCss = false;

if (!process.env.FIREBASE_CLIENT_CONFIG)
  throw new Error('FIREBASE_CLIENT_CONFIG env vvariable is missing');
const firebaseConfig = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG);

if (!process.env.DOMAIN) throw new Error('DOMAIN env vvariable is missing');
const domain = process.env.DOMAIN;

init(firebaseConfig, domain + '/api/graphql', domain);

setAnchorWrapper((props) => {
  if (!props.href) throw new Error('"href" is a requried parameter for anchor wrapper');

  return (
    <Link href={props.href}>
      <a {...props} />
    </Link>
  );
});

const Disclave: React.VFC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator)
      window.addEventListener('load', () => swOnLoadEventListener());
  }, []);

  useAnalytics();

  return (
    <>
      <Head>
        <title>{AppTitle}</title>

        <AppHead />
      </Head>

      <DefaultSeo {...SEO} />

      <SessionProvider
        serverSideUid={pageProps.serverSideUid}
        manageAuthCookie={true}
        isIframe={pageProps.iframe}>
        <Component {...pageProps} />

        <CookieBanner hidden={pageProps.iframe} />
      </SessionProvider>
    </>
  );
};

export default appWithTranslation(Disclave);
