import React, { useState } from "react";
import { ContainerWrapper } from "@/components/container";
import { useTranslation } from "@/i18n";
import { LoginMethodSelect } from "@/components/auth/login/LoginMethodSelect";
import { LoginVerificationCodeForm } from "@/components/auth/login/verificaiton-code-form";

export interface LoginFormContainerProps {
  onEmailLogin: (email: string) => Promise<void>;
  onVerificationCodeConfirm: (email: string, token: string) => Promise<void>;
}

export const LoginFormContainer: React.VFC<LoginFormContainerProps> = (
  props
) => {
  const [email, setEmail] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const { t } = useTranslation("auth");

  const onEmailLogin = async (email: string) => {
    await props.onEmailLogin(email);
    setEmail(email);
    setVerificationCodeSent(true);
  };

  const onVerificationCodeConfirm = async (token: string) => {
    await props.onVerificationCodeConfirm(email, token);
  };

  const Component = () => {
    const state = getState(verificationCodeSent);
    switch (state) {
      case State.METHOD_SELECT:
        return <LoginMethodSelect onEmailLogin={onEmailLogin} />;
      case State.VERIFICATION_CODE:
        return (
          <LoginVerificationCodeForm
            onSubmit={onVerificationCodeConfirm}
            userEmail={email}
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

const getState = (verificationCodeSent: boolean): State => {
  if (verificationCodeSent) return State.VERIFICATION_CODE;
  else return State.METHOD_SELECT;
};

enum State {
  METHOD_SELECT,
  VERIFICATION_CODE,
}
