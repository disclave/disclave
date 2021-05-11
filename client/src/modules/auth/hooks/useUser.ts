import { useEffect, useState } from "react";
import { auth, User } from "../../../firebase";

type UseUser = {
  user: User | null;
  idToken: string | null;
  isLoading: boolean;
};

export const useUser = (): UseUser => {
  const [user, setUser] = useState<User | undefined | null>(undefined);
  const [idToken, setIdToken] = useState<string | null>(null);

  const onIdTokenChanged = async (fbUser: User | null) => {
    if (!fbUser) {
      setIdToken(null);
      setUser(null);
      return;
    }
    const token = await fbUser.getIdToken();
    setIdToken(token);
    setUser(fbUser);
  };

  useEffect(() => auth().onIdTokenChanged(onIdTokenChanged), []);

  return {
    user: user ? user : null,
    idToken: idToken,
    isLoading: user === undefined,
  };
};
