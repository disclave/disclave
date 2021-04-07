import { useEffect, useState } from "react";
import { onAuthStateChanged, UserModel } from "../";

export const useUser = (): UserModel | undefined | null => {
  const [user, setUser] = useState<UserModel | undefined | null>(undefined);

  useEffect(
    () =>
      onAuthStateChanged((user) => {
        if (!user) {
          setUser(user);
          return;
        }

        setUser({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
        });
      }),
    []
  );

  return user;
};
