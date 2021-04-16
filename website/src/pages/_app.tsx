import '../styles/globals.css';
import Link from 'next/link';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { setAnchorWrapper } from '@disclave/ui';
import { init, SessionProvider, SessionModel } from '@disclave/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import { DefaultSeo } from 'next-seo';
import { SEO } from '@/consts';
import { AppHead } from '@/modules/head';
import { useEffect } from 'react';
import { swOnLoadEventListener } from '@/modules/sw';
import { useAnalytics } from '@/modules/analytics';

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

      <SessionProvider savedSession={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default appWithTranslation(Disclave);
