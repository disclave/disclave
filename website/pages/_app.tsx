import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { currentUser, onAuthStateChanged } from '../modules/auth/auth';
import { UserContext } from '../modules/auth/UserContext';
import { appWithTranslation } from 'next-i18next';

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
