import '../styles/globals.css';
import Link from 'next/link';
import { appWithTranslation } from 'next-i18next';
import { setAnchorWrapper } from '@webchat/ui';
import { init } from '@webchat/client';

setAnchorWrapper((props) => (
  <Link href={props.href}>
    <a {...props} />
  </Link>
));

const firebaseConfig = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG);

init(firebaseConfig, '/api/graphql');

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default appWithTranslation(App);
