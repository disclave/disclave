import React from "react";
import { RegisterUsernameForm } from "./form";
import { ContainerWrapper } from "@/components/container";
import { Loading } from "@/components/loading";
import { useTranslation } from "@/i18n";
import { UserModel } from "@/components/auth";

export interface RegisterFormContainerProps {
  user?: UserModel | null;
  onCreateUsername: (name: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

export const RegisterFormContainer: React.VFC<RegisterFormContainerProps> = (
  props
) => {
  const { t } = useTranslation("auth");

  const Component = () => {
    const state = getState(props.user);
    switch (state) {
      case State.LOADING:
        return <Loading />;
      case State.USERNAME:
        return (
          <RegisterUsernameForm
            userEmail={props.user!.email}
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

const getState = (user?: UserModel | null): State => {
  if (!!user && !user.profile) return State.USERNAME;
  else return State.LOADING;
};

enum State {
  LOADING,
  USERNAME,
}
