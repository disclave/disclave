import * as React from "react";
import { useHistory } from "react-router-dom";
import { LoginFormContainer } from "@disclave/ui";
import { login, useSession } from "@disclave/client";
import { homeHref } from "./Home";
import { registerHref } from "./Register";
import { MessageType, sendMessage } from "../messages";
import { useEffect } from "react";
import { acceptableUsePolicy, privacyPolicy } from "../config";

export const loginHref = "/login";

export const Login = () => {
  const history = useHistory();
  const {
    user,
    profile,
    isAuthenticated,
    actions: { logout },
  } = useSession();

  useEffect(() => {
    if (user != null && !isAuthenticated) history.push(registerHref);
  }, [user?.uid, isAuthenticated]);

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
        privacyPolicyHref={privacyPolicy}
        usePolicyHref={acceptableUsePolicy}
        userProfile={profile}
      />
    </div>
  );
};
