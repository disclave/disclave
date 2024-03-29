import React from "react";
import { UserProfileModel } from "@/components/auth";
import { UserInfo } from "@/components/auth/user";
import { ContainerWrapper } from "@/components/container";
import { Loading } from "@/components/loading";
import { useTranslation } from "@/i18n";
import { LoginMethodSelect } from "@/components/auth/login/LoginMethodSelect";

export interface LoginFormContainerProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  onLoginFacebook: () => Promise<void>;
  onLoginGoogle: () => Promise<void>;
  registerHref: string;
  usePolicyHref: string;
  privacyPolicyHref: string;
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
          <LoginMethodSelect
            onLogin={props.onLogin}
            onLoginFacebook={props.onLoginFacebook}
            onLoginGoogle={props.onLoginGoogle}
            registerHref={props.registerHref}
            privacyPolicyHref={props.privacyPolicyHref}
            usePolicyHref={props.usePolicyHref}
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
