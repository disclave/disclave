import React from "react";
import { RegisterUsernameForm } from "./form";
import { ContainerWrapper } from "@/components/container";
import { Loading } from "@/components/loading";
import { useTranslation } from "@/i18n";
import { UserModel } from "@/components/auth";
import { EmailVerificationForm } from "@/components/auth/register/form/email-verification";
import { RegisterMethodSelect } from "@/components/auth/register/RegisterMethodSelect";
import { UserInfo } from "@/components/auth/user";

export interface RegisterFormContainerProps {
  loading: boolean;
  user: UserModel | null;
  onRegisterEmailPass: (email: string, password: string) => Promise<void>;
  onSendEmailVerification: () => Promise<void>;
  onRegisterFacebook: () => Promise<void>;
  onRegisterGoogle: () => Promise<void>;
  onCreateUsername: (name: string) => Promise<void>;
  onLogout: () => Promise<void>;
  loginHref: string;
  usePolicyHref: string;
  privacyPolicyHref: string;
}

export const RegisterFormContainer: React.VFC<RegisterFormContainerProps> = (
  props
) => {
  const { t } = useTranslation("auth");

  const Component = () => {
    const state = getState(props.loading, props.user);
    switch (state) {
      case State.LOADING:
        return <Loading />;
      case State.USER_INFO:
        return (
          <UserInfo
            userProfile={props.user!.profile!}
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
            privacyPolicyHref={props.privacyPolicyHref}
            usePolicyHref={props.usePolicyHref}
          />
        );
      case State.EMAIL_VERIFICATION:
        return (
          <EmailVerificationForm
            userEmail={props.user!.email}
            onSendEmailVerification={props.onSendEmailVerification}
            onLogout={props.onLogout}
          />
        );
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

const getState = (loading: boolean, user: UserModel | null): State => {
  if (loading) return State.LOADING;
  else if (user === null) return State.SELECT_METHOD;
  else if (!user.emailVerified) return State.EMAIL_VERIFICATION;
  else if (!user.profile) return State.USERNAME;
  else return State.USER_INFO;
};

enum State {
  LOADING,
  USER_INFO,
  SELECT_METHOD,
  EMAIL_VERIFICATION,
  USERNAME,
}
