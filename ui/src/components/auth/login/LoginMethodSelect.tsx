import React from "react";
import { GoogleBtn } from "@/components/auth/social";
import { LoginForm } from "@/components/auth/login/form";
import { useTranslation } from "@/i18n";
import { FacebookBtn } from "@/components/auth/social/FacebookBtn";
import { PolicyInfo } from "../policy";

export interface LoginMethodSelectProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onLoginFacebook: () => Promise<void>;
  onLoginGoogle: () => Promise<void>;
  registerHref: string;
  usePolicyHref: string;
  privacyPolicyHref: string;
}

export const LoginMethodSelect: React.VFC<LoginMethodSelectProps> = (props) => {
  const { t } = useTranslation("common");

  return (
    <div>
      <PolicyInfo
        privacyPolicyHref={props.privacyPolicyHref}
        usePolicyHref={props.usePolicyHref}
      />
      <div className="flex flex-row justify-center space-x-2">
        <GoogleBtn onClick={props.onLoginGoogle} />
        <FacebookBtn onClick={props.onLoginFacebook} />
      </div>
      <div className="flex flex-row mt-2 mb-4 uppercase text-gray-400 font-semibold items-center">
        <hr className="flex-grow mx-3" />
        <div>{t("or")}</div>
        <hr className="flex-grow mx-3" />
      </div>
      <LoginForm onSubmit={props.onLogin} registerHref={props.registerHref} />
    </div>
  );
};
