import React from "react";
import { RegisterEmailPassForm, RegisterUsernameForm } from "./form";
import { UserProfileModel } from "../UserProfileModel";
import { UserInfo } from "../user";
import { ContainerWrapper } from "../../container";

export interface RegisterFormContainerProps {
  loading: boolean;
  userProfile: UserProfileModel | null;
  onRegisterEmailPass: (email: string, password: string) => Promise<void>;
  onCreateUsername: (name: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

export const RegisterFormContainer: React.VFC<RegisterFormContainerProps> = (
  props
) => {
  if (props.loading) return <ContainerWrapper>Loading...</ContainerWrapper>; // TODO: use loading component

  if (props.userProfile != null && !props.userProfile.profileFillPending)
    return (
      <ContainerWrapper>
        <UserInfo userProfile={props.userProfile} onLogout={props.onLogout} />
      </ContainerWrapper>
    );

  if (props.userProfile === null)
    return (
      <ContainerWrapper>
        <RegisterEmailPassForm onSubmit={props.onRegisterEmailPass} />
      </ContainerWrapper>
    );

  return (
    <ContainerWrapper>
      <RegisterUsernameForm onSubmit={props.onCreateUsername} />
    </ContainerWrapper>
  );
};
