import * as React from "react";
import { useHistory } from "react-router-dom";
import { RegisterFormContainer } from "@disclave/ui";
import {
  register,
  logout,
  useSession,
  createSelfProfile,
  loginWithFacebook,
  loginWithGoogle,
} from "@disclave/client";
import { homeHref } from "./Home";
import { useState } from "react";
import { loginHref } from "./Login";

export const registerHref = "/register";

export const Register = () => {
  const history = useHistory();
  const [userProfile, isLoadingProfile, , updateUserProfile] = useSession();

  const onRegisterEmailPass = async (email: string, password: string) => {
    await register(email, password);
  };

  const onCreateUsername = async (name: string) => {
    await createSelfProfile(name);
    await updateUserProfile();
    await history.push(homeHref);
  };

  const onLogout = async () => {
    await logout();
    await history.push(homeHref);
  };

  const onFacebookLogin = async () => {
    await loginWithFacebook();
  };
  const onGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div>
      <RegisterFormContainer
        loading={isLoadingProfile}
        userProfile={userProfile}
        onRegisterEmailPass={onRegisterEmailPass}
        onRegisterFacebook={onFacebookLogin}
        onRegisterGoogle={onGoogleLogin}
        onCreateUsername={onCreateUsername}
        onLogout={onLogout}
        loginHref={loginHref}
      />
    </div>
  );
};
