import * as React from "react";
import { useHistory } from "react-router-dom";
import { LoginFormContainer } from "@disclave/ui";
// import { login, logout, useSession } from "@disclave/client";
import { homeHref } from "./Home";
import { registerHref } from "./Register";
import { MessageType, sendMessage } from "../messages";
import { useEffect } from "react";

export const loginHref = "/login";

// TODO: fix
export const Login = () => {
  const history = useHistory();
  // const { partialProfile, profile, isCompleted } = useSession();

  // useEffect(() => {
  //   if (partialProfile != null && !isCompleted) history.push(registerHref);
  // }, [partialProfile?.uid, isCompleted]);

  const onLogin = async (email: string, password: string) => {
    // await login(email, password);
    // await history.push(homeHref);
  };

  const onLogout = async () => {
    // await logout();
    // await history.push(homeHref);
  };

  const onFacebookLogin = async () => {
    await sendMessage({ type: MessageType.LOGIN_FACEBOOK });
  };
  const onGoogleLogin = async () => {
    await sendMessage({ type: MessageType.LOGIN_GOOGLE });
  };

  return (
    <div>
      {/*<LoginFormContainer*/}
      {/*  onLogin={onLogin}*/}
      {/*  onLogout={onLogout}*/}
      {/*  onLoginFacebook={onFacebookLogin}*/}
      {/*  onLoginGoogle={onGoogleLogin}*/}
      {/*  registerHref={registerHref}*/}
      {/*  userProfile={profile}*/}
      {/*/>*/}
    </div>
  );
};
