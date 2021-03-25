import * as React from "react";
import { useHistory } from "react-router-dom";
import { LoginFormContainer } from "@disclave/ui";
import { login, logout, useSession } from "@disclave/client";
import { homeHref } from "./Home";
import { registerHref } from "./Register";

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

  return (
    <div>
      <LoginFormContainer
        onLogin={onLogin}
        onLogout={onLogout}
        registerHref={registerHref}
        userProfile={!isLoadingProfile ? userProfile : undefined}
      />
    </div>
  );
};
