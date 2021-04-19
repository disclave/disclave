import React from "react";
import { RegisterUsernameForm } from "./form";
import { UserInfo } from "../user";
import { ContainerWrapper } from "@/components/container";
import { Loading } from "@/components/loading";
import { useTranslation } from "@/i18n";
import { RegisterMethodSelect } from "@/components/auth/register/RegisterMethodSelect";
import { EmailVerificationForm } from "./form/email-verification";
import { SessionModel } from "@disclave/client";

export interface RegisterFormContainerProps {
  session?: SessionModel | null;
  loginHref: string;
  onRegisterEmailPass: (email: string, password: string) => Promise<void>;
  onSendEmailVerification: () => Promise<void>;
  onRegisterFacebook: () => Promise<void>;
  onRegisterGoogle: () => Promise<void>;
  onCreateUsername: (name: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

export const RegisterFormContainer: React.VFC<RegisterFormContainerProps> = (
  props
) => {
  const { t } = useTranslation("auth");

  const Component = () => {
    const state = getState(props.session);
    switch (state) {
      case State.LOADING:
        return <Loading />;
      case State.USER_INFO:
        return (
          <UserInfo
            userProfile={props.session!.profile!}
            onLogout={props.onLogout}
          />
        );
      case State.SELECT_METHOD:
        return (
          <RegisterMethodSelect
            onRegisterEmailPass={props.onRegisterEmailPass}
            onRegisterFacebook={props.onRegisterFacebook}
            onRegisterGoogle={props.onRegisterGoogle}
            loginHref={props.loginHref}
          />
        );
      case State.EMAIL_VERIFICATION:
        return (
          <EmailVerificationForm
            userEmail={props.session!.email}
            onSendEmailVerification={props.onSendEmailVerification}
            onLogout={props.onLogout}
          />
        );
      case State.USERNAME:
        return (
          <RegisterUsernameForm
            userEmail={props.session!.email}
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

const getState = (session?: SessionModel | null): State => {
  if (session === undefined) return State.LOADING;
  else if (!session) return State.SELECT_METHOD;
  else if (!session.emailVerified) return State.EMAIL_VERIFICATION;
  else if (!session.profile) return State.USERNAME;
  else return State.USER_INFO;
};

enum State {
  LOADING,
  USER_INFO,
  SELECT_METHOD,
  EMAIL_VERIFICATION,
  USERNAME,
}
