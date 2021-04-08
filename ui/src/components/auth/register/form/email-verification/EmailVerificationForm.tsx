import React from "react";
import { useLoading } from "@/hooks";
import { useTranslation } from "@/i18n";
import { Button } from "@/components/button";
import { FormErrorContainer } from "@/components/forms";

export interface EmailVerificationFormProps {
  userEmail: string;
  onSendEmailVerification: () => Promise<void>;
  onLogout: () => Promise<void>;
}

export const EmailVerificationForm: React.VFC<EmailVerificationFormProps> = (
  props
) => {
  const { t } = useTranslation("auth");
  const [loading, runWithLoading, error] = useLoading(false);

  const onSendEmail = async () => {
    await runWithLoading(() => props.onSendEmailVerification());
  };

  const onLogoutClick = async () => {
    await runWithLoading(() => props.onLogout());
  };

  return (
    <div>
      <p className="p-4 text-white text-lg bg-green-500 rounded">
        {t("register.email verification.information", {
          email: props.userEmail,
        })}
      </p>
      <p className="pt-4 pb-1">
        {t("register.email verification.missing email")}
      </p>
      <div className="flex flex-row space-x-2 py-2">
        <Button onClick={onSendEmail} outlined disabled={loading}>
          {t("register.email verification.button.send email")}
        </Button>
        <Button onClick={onLogoutClick} flat disabled={loading}>
          {t("register.email verification.button.use different account")}
        </Button>
      </div>
      <FormErrorContainer error={error} />
    </div>
  );
};
