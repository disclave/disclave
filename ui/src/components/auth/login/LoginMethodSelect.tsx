import React from "react";
import { GoogleBtn } from "@/components/auth/social";
import { LoginForm } from "./form";
import { useTranslation } from "@/i18n";
import { FacebookBtn } from "@/components/auth/social/FacebookBtn";

export interface LoginMethodSelectProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onLoginFacebook: () => Promise<void>;
  onLoginGoogle: () => Promise<void>;
  registerHref: string;
}

export const LoginMethodSelect: React.VFC<LoginMethodSelectProps> = (props) => {
  const { t } = useTranslation("common");

  return (
    <div>
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
