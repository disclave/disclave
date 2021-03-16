import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { currentUser, onAuthStateChanged } from '../modules/auth/auth';
import { UserContext } from '../modules/auth/UserContext';
import { LocaleContext } from '@webchat/ui';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(setUser));

  const router = useRouter();
  const localeData = {
    locale: router.locale
  };

  // // TODO: remove after testing!
  // useEffect(() => {
  //   if (user == null)
  //     return
  //   currentUser().getIdToken().then(t => console.log(t))
  // }, [user])

  return (
    <LocaleContext.Provider value={localeData}>
      <UserContext.Provider value={user}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </LocaleContext.Provider>
  );
};
export default App;
