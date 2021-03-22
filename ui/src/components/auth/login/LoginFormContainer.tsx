import React from "react";
import { LoginForm } from "./form";
import { UserProfileModel } from "../UserProfileModel";
import { UserInfo } from "../user";
import { ContainerWrapper } from "../../container";
import { Loading } from "../../loading";

export interface LoginFormContainerProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  userProfile?: UserProfileModel | null;
}

export const LoginFormContainer: React.VFC<LoginFormContainerProps> = (
  props
) => {
  if (props.userProfile === undefined)
    return (
      <ContainerWrapper>
        <Loading />
      </ContainerWrapper>
    );

  if (props.userProfile === null)
    return (
      <ContainerWrapper>
        <LoginForm onSubmit={props.onLogin} />
      </ContainerWrapper>
    );

  return (
    <ContainerWrapper>
      <UserInfo userProfile={props.userProfile} onLogout={props.onLogout} />
    </ContainerWrapper>
  );
};
