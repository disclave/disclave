import { useEffect, useState } from "react";
import { auth, User } from "../../../firebase";

type UseUser = {
  user: User | null;
  isLoading: boolean;
};

export const useUser = (): UseUser => {
  const [user, setUser] = useState<User | undefined | null>(undefined);

  const onAuthStateChanged = async (fbUser: User | null) => {
    setUser(fbUser);
  };

  useEffect(() => auth().onAuthStateChanged(onAuthStateChanged), []);

  return {
    user: user ? user : null,
    isLoading: user === undefined,
  };
};
