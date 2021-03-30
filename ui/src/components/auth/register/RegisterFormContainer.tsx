import React from "react";
import { RegisterUsernameForm } from "./form";
import { UserProfileModel } from "../UserProfileModel";
import { UserInfo } from "../user";
import { ContainerWrapper } from "@/components/container";
import { Loading } from "@/components/loading";
import { useTranslation } from "@/i18n";
import { RegisterMethodSelect } from "@/components/auth/register/RegisterMethodSelect";

export interface RegisterFormContainerProps {
  loading: boolean;
  userProfile: UserProfileModel | null;
  onRegisterEmailPass: (email: string, password: string) => Promise<void>;
  onCreateUsername: (name: string) => Promise<void>;
  onLogout: () => Promise<void>;
  loginHref: string;
}

export const RegisterFormContainer: React.VFC<RegisterFormContainerProps> = (
  props
) => {
  const { t } = useTranslation("auth");

  const Component = () => {
    const state = getState(props.loading, props.userProfile);
    switch (state) {
      case State.LOADING:
        return <Loading />;
      case State.USER_INFO:
        return (
          <UserInfo
            userProfile={props.userProfile!}
            onLogout={props.onLogout}
          />
        );
      case State.SELECT_METHOD:
        return (
          <RegisterMethodSelect
            onRegisterEmailPass={props.onRegisterEmailPass}
            loginHref={props.loginHref}
          />
        );
      case State.USERNAME:
        return (
          <RegisterUsernameForm
            userEmail={props.userProfile!.email}
            onSubmit={props.onCreateUsername}
            onLogout={props.onLogout}
          />
        );
    }
  };

  return (
    <ContainerWrapper title={t("register.title")}>
      <Component />
    </ContainerWrapper>
  );
};

const getState = (
  loading: boolean,
  userProfile: UserProfileModel | null
): State => {
  if (loading) return State.LOADING;
  else if (userProfile !== null && !userProfile.profileFillPending)
    return State.USER_INFO;
  else if (userProfile === null) return State.SELECT_METHOD;
  else return State.USERNAME;
};

enum State {
  LOADING,
  USER_INFO,
  SELECT_METHOD,
  USERNAME,
}
