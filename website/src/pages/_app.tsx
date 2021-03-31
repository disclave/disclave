import '../styles/globals.css';
import Link from 'next/link';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { setAnchorWrapper } from '@disclave/ui';
import { init } from '@disclave/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import { AppHead } from '@/modules/head';

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

        <AppHead />
      </Head>

      <Component {...pageProps} />
    </>
  );
};
export default appWithTranslation(App);
