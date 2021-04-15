// import { useEffect, useState } from "react";
// import { onAuthStateChanged, sendEmailVerification, UserModel } from "../";
//
// type SendEmailVerification = (emailRedirectUrl?: string) => Promise<void>;
// type UseUser = {
//   user: UserModel | undefined | null;
//   sendEmailVerification: SendEmailVerification;
// };

export const useUser = () /*: UseUser*/ => {
  // const [user, setUser] = useState<UserModel | undefined | null>(undefined);
  //
  // const emailVerification = async (emailRedirectUrl?: string) => {
  //   if (!user) {
  //     // TODO: throw?
  //     return;
  //   }
  //   await sendEmailVerification(emailRedirectUrl);
  // };
  //
  // useEffect(
  //   () =>
  //     onAuthStateChanged((user) => {
  //       if (!user) {
  //         setUser(user);
  //         return;
  //       }
  //
  //       setUser({
  //         uid: user.uid,
  //         email: user.email,
  //         emailVerified: user.emailVerified,
  //       });
  //     }),
  //   []
  // );
  //
  // return {
  //   user: user,
  //   sendEmailVerification: emailVerification,
  // };
};
