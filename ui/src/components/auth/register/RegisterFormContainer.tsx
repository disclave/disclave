import React from "react";
import { RegisterEmailPassForm, RegisterUsernameForm } from "./form";
import { UserProfileModel } from "../UserProfileModel";
import { UserInfo } from "../user";
import { ContainerWrapper } from "../../container";
import { Loading } from "../../loading";

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
      case State.EMAIL_PASS:
        return (
          <RegisterEmailPassForm
            onSubmit={props.onRegisterEmailPass}
            loginHref={props.loginHref}
          />
        );
      case State.USERNAME:
        return <RegisterUsernameForm onSubmit={props.onCreateUsername} />;
    }
  };

  return (
    <ContainerWrapper>
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
  else if (userProfile === null) return State.EMAIL_PASS;
  else return State.USERNAME;
};

enum State {
  LOADING,
  USER_INFO,
  EMAIL_PASS,
  USERNAME,
}
