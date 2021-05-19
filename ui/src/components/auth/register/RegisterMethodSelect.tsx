import React from "react";
import { SocialAuth } from "@/components/auth/social";
import { RegisterEmailPassForm } from "./form";
import { useTranslation } from "@/i18n";
import { PolicyInfo } from "../policy";

export interface RegisterMethodSelectProps {
  onRegisterEmailPass: (email: string, password: string) => Promise<void>;
  onRegisterFacebook: () => Promise<void>;
  onRegisterGoogle: () => Promise<void>;
  loginHref: string;
  usePolicyHref: string;
  privacyPolicyHref: string;
}

export const RegisterMethodSelect: React.VFC<RegisterMethodSelectProps> = (
  props
) => {
  const { t } = useTranslation("common");

  return (
    <div>
      <PolicyInfo
        privacyPolicyHref={props.privacyPolicyHref}
        usePolicyHref={props.usePolicyHref}
      />
      <SocialAuth
        onAuthFacebook={props.onRegisterFacebook}
        onAuthGoogle={props.onRegisterGoogle}
      />
      <div className="flex flex-row mt-2 mb-4 uppercase text-gray-400 font-semibold items-center">
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
