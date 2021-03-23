import * as React from "react";
import { useHistory } from "react-router-dom";
import { RegisterFormContainer } from "@webchat/ui";
import {
  register,
  logout,
  useSession,
  createSelfProfile,
} from "@webchat/client";
import { homeHref } from "./Home";
import { useState } from "react";
import { loginHref } from "./Login";

export const registerHref = "/register";

export const Register = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [userProfile, , , updateUserProfile] = useSession();

  const onRegisterEmailPass = async (email: string, password: string) => {
    setLoading(true);
    await register(email, password);
  };

  const onCreateUsername = async (name: string) => {
    setLoading(true);
    await createSelfProfile(name);
    await updateUserProfile();
    setLoading(false);
    await history.push(homeHref);
  };

  const onLogout = async () => {
    await logout();
    await history.push(homeHref);
  };

  return (
    <div>
      <RegisterFormContainer
        loading={loading}
        userProfile={userProfile}
        onRegisterEmailPass={onRegisterEmailPass}
        onCreateUsername={onCreateUsername}
        onLogout={onLogout}
        loginHref={loginHref}
      />
    </div>
  );
};
