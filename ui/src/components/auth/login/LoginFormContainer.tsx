import React from "react";
import { LoginForm } from "./form";
import { UserProfileModel } from "../UserProfileModel";
import { LoginUserInfo } from "./user";
import { ContainerWrapper } from "../../container";

export interface LoginFormContainerProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  userProfile?: UserProfileModel | null;
}

export const LoginFormContainer: React.VFC<LoginFormContainerProps> = (
  props
) => {
  if (props.userProfile === undefined)
    return <ContainerWrapper>Loading...</ContainerWrapper>; // TODO: use loading component

  if (props.userProfile === null)
    return (
      <ContainerWrapper>
        <LoginForm onSubmit={props.onLogin} />
      </ContainerWrapper>
    );

  return (
    <ContainerWrapper>
      <LoginUserInfo
        userProfile={props.userProfile}
        onLogout={props.onLogout}
      />
    </ContainerWrapper>
  );
};
