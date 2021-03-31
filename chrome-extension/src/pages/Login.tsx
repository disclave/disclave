import * as React from "react";
import { useHistory } from "react-router-dom";
import { LoginFormContainer } from "@disclave/ui";
import { login, logout, useSession } from "@disclave/client";
import { homeHref } from "./Home";
import { registerHref } from "./Register";
import { MessageType, sendMessage } from "../messages";

export const loginHref = "/login";

export const Login = () => {
  const history = useHistory();
  const [userProfile, isLoadingProfile] = useSession();

  const onLogin = async (email: string, password: string) => {
    await login(email, password);
    await history.push(homeHref);
  };

  const onLogout = async () => {
    await logout();
    await history.push(homeHref);
  };

  const onFacebookLogin = async () => {
    await sendMessage({ type: MessageType.LOGIN_FACEBOOK });
  };
  const onGoogleLogin = async () => {
    await sendMessage({ type: MessageType.LOGIN_GOOGLE });
  };

  return (
    <div>
      <LoginFormContainer
        onLogin={onLogin}
        onLogout={onLogout}
        onLoginFacebook={onFacebookLogin}
        onLoginGoogle={onGoogleLogin}
        registerHref={registerHref}
        userProfile={!isLoadingProfile ? userProfile : undefined}
      />
    </div>
  );
};
