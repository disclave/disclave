import * as React from "react";
import { LoginFormContainer } from "@webchat/ui";
import { login, logout } from "@webchat/client";

export const loginHref = "/login";

export const Login = () => {
  // TODO: fetch from context
  let userProfile = null;

  const onLogin = async (email: string, password: string) => {
    // await login(email, password);
  };

  const onLogout = async () => {
    // await logout();
  };

  return (
    <div>
      <LoginFormContainer
        onLogin={onLogin}
        onLogout={onLogout}
        userProfile={userProfile}
      />
    </div>
  );
};
