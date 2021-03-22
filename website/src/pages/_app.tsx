import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { appWithTranslation } from 'next-i18next';
import { setAnchorWrapper } from '@webchat/ui';
import { init, currentUser, onAuthStateChanged, UserContext } from '@webchat/client';

setAnchorWrapper((props) => (
  <Link href={props.href}>
    <a {...props} />
  </Link>
));

const firebaseConfig = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG);

init(firebaseConfig, '/api/graphql');

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(setUser));

  // // TODO: remove after testing!
  // useEffect(() => {
  //   if (user == null)
  //     return
  //   currentUser().getIdToken().then(t => console.log(t))
  // }, [user])

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
};
export default appWithTranslation(App);
