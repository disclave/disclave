import React from "react";
import { LoginForm } from "./form";
import { UserProfileModel } from "../UserProfileModel";
import { UserInfo } from "../user";
import { ContainerWrapper } from "../../container";
import { Loading } from "../../loading";
import { useTranslation } from "react-i18next";

export interface LoginFormContainerProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  registerHref: string;
  userProfile?: UserProfileModel | null;
}

export const LoginFormContainer: React.VFC<LoginFormContainerProps> = (
  props
) => {
  const { t } = useTranslation("auth");

  const Component = () => {
    const state = getState(props.userProfile);
    switch (state) {
      case State.LOADING:
        return <Loading />;
      case State.LOGIN_FORM:
        return (
          <LoginForm
            onSubmit={props.onLogin}
            registerHref={props.registerHref}
          />
        );
      case State.USER_INFO:
        return (
          <UserInfo
            userProfile={props.userProfile!}
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

const getState = (userProfile?: UserProfileModel | null): State => {
  if (userProfile === undefined) return State.LOADING;
  else if (userProfile === null) return State.LOGIN_FORM;
  else return State.USER_INFO;
};

enum State {
  LOADING,
  LOGIN_FORM,
  USER_INFO,
}
