import '../styles/globals.css'
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "../modules/auth/auth";
import {UserContext} from "../modules/auth/UserContext";

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState(undefined)
  useEffect(() => onAuthStateChanged(setUser))

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
export default App