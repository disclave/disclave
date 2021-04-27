import React from "react";
import { LoginEmailForm } from "./email-form";
import { useTranslation } from "@/i18n";

export interface LoginMethodSelectProps {
  onEmailLogin: (email: string) => Promise<void>;
}

export const LoginMethodSelect: React.VFC<LoginMethodSelectProps> = (props) => {
  const { t } = useTranslation("common");

  return (
    <div>
      {/*<div className="flex flex-row justify-center space-x-2">*/}
      {/*  <GoogleBtn onClick={props.onLoginGoogle} />*/}
      {/*  <FacebookBtn onClick={props.onLoginFacebook} />*/}
      {/*</div>*/}
      {/*<div className="flex flex-row mt-2 mb-4 uppercase text-gray-400 font-semibold items-center">*/}
      {/*  <hr className="flex-grow mx-3" />*/}
      {/*  <div>{t("or")}</div>*/}
      {/*  <hr className="flex-grow mx-3" />*/}
      {/*</div>*/}
      <LoginEmailForm onSubmit={props.onEmailLogin} />
    </div>
  );
};
