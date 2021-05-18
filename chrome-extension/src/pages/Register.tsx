import * as React from "react";
import { useHistory } from "react-router-dom";
import { RegisterFormContainer } from "@disclave/ui";
import { register, useSession } from "@disclave/client";
import { homeHref } from "./Home";
import { loginHref } from "./Login";
import { MessageType, sendMessage } from "../messages";
import { privacyPolicy, acceptableUsePolicy } from "../config";

export const registerHref = "/register";

export const Register = () => {
  const history = useHistory();
  const {
    user,
    isLoading,
    actions: { logout, sendVerificationEmail, createProfile },
  } = useSession();

  const onRegisterEmailPass = async (email: string, password: string) => {
    await register(email, password);
  };

  const onCreateUsername = async (name: string) => {
    await createProfile(name);
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

  const onSendEmailVerification = async () => {
    await sendVerificationEmail();
  };

  return (
    <div>
      <RegisterFormContainer
        loading={isLoading}
        user={user}
        onRegisterEmailPass={onRegisterEmailPass}
        onRegisterFacebook={onFacebookLogin}
        onRegisterGoogle={onGoogleLogin}
        onCreateUsername={onCreateUsername}
        onLogout={onLogout}
        loginHref={loginHref}
        privacyPolicyHref={privacyPolicy}
        usePolicyHref={acceptableUsePolicy}
        onSendEmailVerification={onSendEmailVerification}
      />
    </div>
  );
};
