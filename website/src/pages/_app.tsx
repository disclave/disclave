import '../styles/globals.css';
import Link from 'next/link';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { setAnchorWrapper } from '@disclave/ui';
import { init } from '@disclave/client';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

setAnchorWrapper((props) => (
  <Link href={props.href}>
    <a {...props} />
  </Link>
));

const firebaseConfig = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG);

init(firebaseConfig, '/api/graphql');

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Disclave</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};
export default appWithTranslation(App);
