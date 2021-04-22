import React from "react";
import { UserInfo } from "../user";
import { ContainerWrapper } from "@/components/container";
import { Loading } from "@/components/loading";
import { useTranslation } from "@/i18n";
import { LoginMethodSelect } from "@/components/auth/login/LoginMethodSelect";
import { SessionModel } from "@/components/auth";

export interface LoginFormContainerProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  onLoginFacebook: () => Promise<void>;
  onLoginGoogle: () => Promise<void>;
  registerHref: string;
  session?: SessionModel | null;
}

export const LoginFormContainer: React.VFC<LoginFormContainerProps> = (
  props
) => {
  const { t } = useTranslation("auth");

  const Component = () => {
    const state = getState(props.session);
    switch (state) {
      case State.LOADING:
        return <Loading />;
      case State.LOGIN_FORM:
        return (
          <LoginMethodSelect
            onLogin={props.onLogin}
            onLoginFacebook={props.onLoginFacebook}
            onLoginGoogle={props.onLoginGoogle}
            registerHref={props.registerHref}
          />
        );
      case State.USER_INFO:
        return (
          <UserInfo
            userProfile={props.session?.profile!}
            onLogout={props.onLogout}
          />
        );
    }
  };

  return (
    <ContainerWrapper title={t("login.title")}>
      <Component />
    </ContainerWrapper>
  );
};

const getState = (session?: SessionModel | null): State => {
  if (session === undefined) return State.LOADING;
  else if (session === null) return State.LOGIN_FORM;
  else if (!session.profile) return State.LOADING;
  else return State.USER_INFO;
};

enum State {
  LOADING,
  LOGIN_FORM,
  USER_INFO,
}
