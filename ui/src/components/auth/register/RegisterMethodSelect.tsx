import React from "react";
import { GoogleBtn } from "@/components/auth/social";
import { RegisterEmailPassForm } from "./form";
import { useTranslation } from "@/i18n";

export interface RegisterMethodSelectProps {
  onRegisterEmailPass: (email: string, password: string) => Promise<void>;
  loginHref: string;
}

export const RegisterMethodSelect: React.VFC<RegisterMethodSelectProps> = (
  props
) => {
  const { t } = useTranslation("common");

  const googleLogin = () => {};

  return (
    <div>
      <div className="flex flex-row justify-center space-x-2">
        <GoogleBtn onClick={googleLogin} />
      </div>
      <div className="flex flex-row mt-1 mb-3 uppercase text-gray-400 font-semibold items-center">
        <hr className="flex-grow mx-3" />
        <div>{t("or")}</div>
        <hr className="flex-grow mx-3" />
      </div>
      <RegisterEmailPassForm
        onSubmit={props.onRegisterEmailPass}
        loginHref={props.loginHref}
      />
    </div>
  );
};
